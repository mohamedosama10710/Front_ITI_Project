import { useState } from "react";
import { Menu } from "@base-ui/react/menu";
import {
  ChevronDown,
  Heart,
  LogOut,
  Menu as MenuIcon,
  Package,
  Search,
  ShoppingCart,
  Star,
  User,
  X,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
  { label: "Sign Up", href: "/signup" },
];

const ACCOUNT_MENU_ITEMS = [
  { label: "Manage My Account", icon: User },
  { label: "My Order", icon: Package },
  { label: "My Cancellations", icon: XCircle },
  { label: "My Reviews", icon: Star },
  { label: "Logout", icon: LogOut },
];

interface NavbarProps {
  cartCount?: number;
  isLoggedIn?: boolean;
}

export function Navbar({ cartCount = 0, isLoggedIn = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header>
      {}
      <div className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-sm">
          <p className="text-center">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
            <a
              href="/category/swimwear"
              className="font-semibold underline underline-offset-2"
            >
              ShopNow
            </a>
          </p>
          {}
          <button
            type="button"
            className="ml-6 hidden shrink-0 items-center gap-1 text-sm sm:flex"
          >
            English
            <ChevronDown className="size-3.5" />
          </button>
        </div>
      </div>

      {}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5">
          <a href="/" className="text-xl font-bold">
            Bab Rizk
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-sm">
              {NAV_LINKS.map(({ label, href }) => {
                const isHome = href === "/";
                return (
                  <li key={href}>
                    <a
                      href={href}
                      aria-current={isHome ? "page" : undefined}
                      className={cn(
                        "pb-1",
                        isHome
                          ? "border-b border-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <label className="relative hidden md:block">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                placeholder="What are you looking for?"
                className="w-56 rounded-sm bg-secondary py-2 pr-9 pl-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
            </label>

            <a
              href="/wishlist"
              aria-label="Wishlist"
              className="hover:text-brand"
            >
              <Heart className="size-5" />
            </a>

            <a
              href="/cart"
              aria-label={`Cart, ${cartCount} items`}
              className="relative hover:text-brand"
            >
              <ShoppingCart className="size-5" />
              {cartCount > 0 ? (
                <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-medium text-brand-foreground">
                  {cartCount}
                </span>
              ) : null}
            </a>

            {isLoggedIn ? (
              <Menu.Root>
                <Menu.Trigger
                  aria-label="Account menu"
                  className="flex size-8 items-center justify-center rounded-full bg-brand text-brand-foreground"
                >
                  <User className="size-4" />
                </Menu.Trigger>
                <Menu.Portal>
                  <Menu.Positioner align="end" sideOffset={8}>
                    <Menu.Popup className="min-w-56 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md">
                      {ACCOUNT_MENU_ITEMS.map(({ label, icon: Icon }) => (
                        <Menu.Item
                          key={label}
                          className="flex cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2 text-sm outline-none data-[highlighted]:bg-muted"
                        >
                          <Icon className="size-4" />
                          {label}
                        </Menu.Item>
                      ))}
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.Root>
            ) : null}

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="lg:hidden"
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <MenuIcon className="size-5" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <nav
            aria-label="Mobile"
            className="border-t border-border px-4 py-4 lg:hidden"
          >
            <ul className="flex flex-col gap-4 text-sm">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
            <label className="relative mt-4 block md:hidden">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                placeholder="What are you looking for?"
                className="w-full rounded-sm bg-secondary py-2 pr-9 pl-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Search className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
            </label>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
