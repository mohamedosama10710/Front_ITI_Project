import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Heart,
  Menu as MenuIcon,
  Search,
  ShoppingCart,
  User,
  X,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "@/store/api/productApi";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "category", href: "/category/all" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "Sign Up", href: "/signup" },
];

interface NavbarProps {
  cartCount?: number;
  isLoggedIn?: boolean;
}

export function Navbar({ cartCount = 0, isLoggedIn = true }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useGetProductsQuery();

  const filteredProducts = searchQuery.trim()
    ? products.filter((product: any) => {
        const title = product.title || product.name || "";
        return title.toLowerCase().includes(searchQuery.toLowerCase());
      })
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isOutsideDesktop =
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target as Node);
      const isOutsideMobile =
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node);

      if (
        (isOutsideDesktop || !desktopSearchRef.current) &&
        (isOutsideMobile || !mobileSearchRef.current)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectProduct = (productId: string | number) => {
    navigate(`/product/${productId}`);
    setSearchQuery("");
    setShowDropdown(false);
    setMobileOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowDropdown(false);
      setMobileOpen(false);
    }
  };

  return (
    <header className="w-full">
      {/* Top Banner */}
      <div className="bg-black text-white">
        <div className="flex container items-center justify-between text-sm">
          <div></div>
          <p className="text-center">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
            <a
              href="/category/swimwear"
              className="font-semibold underline underline-offset-2"
            >
              ShopNow
            </a>
          </p>
          <button
            type="button"
            className="ml-6 hidden shrink-0 items-center gap-1 text-sm sm:flex cursor-pointer"
          >
            English
            <ChevronDown className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-border">
        <div className="flex container items-center justify-between py-5">
          <NavLink to="/" className="text-xl font-bold">
            <Logo />
          </NavLink>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      cn(
                        "pb-1",
                        isActive
                          ? "border-b-3 border-secondary-2 font-medium"
                          : "text-muted-foreground hover:text-secondary-2"
                      )
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            {/* Live Search Container */}
            <div ref={desktopSearchRef} className="relative hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <span className="sr-only">Search products</span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="What are you looking for?"
                  className="w-64 rounded-sm bg-secondary py-2 pr-9 pl-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <Search className="size-4" />
                </button>
              </form>

              {/* Live Search Dropdown */}
              {showDropdown && searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 max-h-80 overflow-y-auto rounded-md border border-border bg-popover p-2 shadow-lg z-50 bg-white">
                  {isLoading ? (
                    <div className="flex items-center justify-center p-4 text-muted-foreground">
                      <Loader2 className="size-5 animate-spin mr-2" />
                      <span>Loading...</span>
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    <ul className="flex flex-col gap-1">
                      {filteredProducts.map((product: any) => (
                        <li key={product.id}>
                          <button
                            type="button"
                            onClick={() => handleSelectProduct(product.id)}
                            className="flex w-full items-center gap-3 rounded-sm p-2 text-left hover:bg-secondary-2 hover:text-white transition-colors cursor-pointer"
                          >
                            {product.image || product.thumbnail ? (
                              <img
                                src={product.image || product.thumbnail}
                                alt={product.title || product.name}
                                className="size-10 object-contain rounded bg-white p-1"
                              />
                            ) : null}
                            <div className="flex flex-col overflow-hidden">
                              <span className="text-sm font-medium truncate text-foreground">
                                {product.title || product.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                ${product.price}
                              </span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-3 text-center text-sm text-muted-foreground">
                      No products found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <NavLink
              to="/wishlist"
              aria-label="Wishlist"
              className="hover:text-brand cursor-pointer"
            >
              <Heart className="size-5" />
            </NavLink>

            {/* Cart Link */}
            <NavLink
              to="/cart"
              aria-label={`Cart, ${cartCount} items`}
              className="relative hover:text-brand cursor-pointer"
            >
              <ShoppingCart className="size-5" />
              {cartCount > 0 ? (
                <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-medium text-brand-foreground">
                  {cartCount}
                </span>
              ) : null}
            </NavLink>

            {/* User Account Icon - Navigates directly to /account */}
            <NavLink
              to="/account"
              aria-label="Account"
              className="flex size-8 items-center justify-center rounded-full bg-brand text-brand-foreground hover:opacity-90 transition-opacity cursor-pointer"
            >
              <User className="size-5" />
            </NavLink>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="lg:hidden cursor-pointer"
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <MenuIcon className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen ? (
          <nav
            aria-label="Mobile"
            className="border-t border-border px-4 py-4 lg:hidden"
          >
            <ul className="flex flex-col gap-4 text-sm">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <NavLink
                    to={href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-foreground hover:text-brand"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}