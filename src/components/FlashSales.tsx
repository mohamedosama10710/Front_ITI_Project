import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Eye, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  stock: number;
}

interface SaleProduct extends Product {
  oldPrice?: number;
  discountPercent?: number;
  reviewsCount?: number;
}

const FLASH_SALE_PRODUCTS: SaleProduct[] = [
  {
    id: "1",
    title: "HAVIT HV-G92 Gamepad",
    price: 120,
    oldPrice: 160,
    discountPercent: 40,
    image: "https://placehold.co/300x300/f5f5f5/1a1a1a?text=Gamepad",
    category: "gaming",
    description: "",
    rating: 5,
    reviewsCount: 88,
    stock: 12,
  },
  {
    id: "2",
    title: "AK-900 Wired Keyboard",
    price: 960,
    oldPrice: 1160,
    discountPercent: 35,
    image: "https://placehold.co/300x300/f5f5f5/1a1a1a?text=Keyboard",
    category: "accessories",
    description: "",
    rating: 4,
    reviewsCount: 75,
    stock: 8,
  },
  {
    id: "3",
    title: "IPS LCD Gaming Monitor",
    price: 370,
    oldPrice: 400,
    discountPercent: 30,
    image: "https://placehold.co/300x300/f5f5f5/1a1a1a?text=Monitor",
    category: "electronics",
    description: "",
    rating: 5,
    reviewsCount: 99,
    stock: 5,
  },
  {
    id: "4",
    title: "S-Series Comfort Chair",
    price: 375,
    oldPrice: 400,
    discountPercent: 25,
    image: "https://placehold.co/300x300/f5f5f5/1a1a1a?text=Chair",
    category: "furniture",
    description: "",
    rating: 5,
    reviewsCount: 99,
    stock: 3,
  },
  {
    id: "5",
    title: "S-Series Comfort Chair",
    price: 375,
    oldPrice: 400,
    discountPercent: 25,
    image: "https://placehold.co/300x300/f5f5f5/1a1a1a?text=Chair",
    category: "furniture",
    description: "",
    rating: 5,
    reviewsCount: 99,
    stock: 0,
  },
];

function StarRating({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < rounded
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted",
          )}
        />
      ))}
    </div>
  );
}

interface ProductCardProps {
  product: SaleProduct;
  isWishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
  onQuickView?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

function ProductCard({
  product,
  isWishlisted = false,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}: ProductCardProps) {
  const {
    id,
    title,
    price,
    image,
    oldPrice,
    discountPercent,
    rating,
    reviewsCount,
  } = product;

  return (
    <div className="group flex w-full flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-md bg-secondary">
        {discountPercent ? (
          <span className="absolute top-3 left-3 z-10 rounded-sm bg-brand px-2.5 py-1 text-xs font-medium text-brand-foreground">
            -{discountPercent}%
          </span>
        ) : null}

        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
          <button
            type="button"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            aria-pressed={isWishlisted}
            onClick={() => onToggleWishlist?.(id)}
            className="flex size-7 items-center justify-center rounded-full bg-background text-foreground transition-colors hover:text-brand"
          >
            <Heart
              className={cn("size-4", isWishlisted && "fill-brand text-brand")}
            />
          </button>
          <button
            type="button"
            aria-label="Quick view"
            onClick={() => onQuickView?.(id)}
            className="flex size-7 items-center justify-center rounded-full bg-background text-foreground transition-colors hover:text-brand"
          >
            <Eye className="size-4" />
          </button>
        </div>

        <img
          src={image}
          alt={title}
          className="size-full object-cover"
          loading="lazy"
        />

        <button
          type="button"
          onClick={() => onAddToCart?.(id)}
          className="absolute inset-x-0 bottom-0 translate-y-full bg-foreground py-2 text-sm font-medium text-background transition-transform duration-200 group-hover:translate-y-0 group-focus-within:translate-y-0"
        >
          Add To Cart
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="truncate text-sm font-medium">{title}</p>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-brand">${price}</span>
          {oldPrice ? (
            <span className="text-sm text-muted-foreground line-through">
              ${oldPrice}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <StarRating rating={rating} />
          {reviewsCount !== undefined ? (
            <span className="text-xs text-muted-foreground">
              ({reviewsCount})
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function getTimeLeft(target: number) {
  const diff = Math.max(target - Date.now(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xl font-bold">
        {String(value).padStart(2, "0")}
      </span>
    </div>
  );
}

export function FlashSales() {
  const [saleEndsAt] = useState(
    () => Date.now() + (3 * 24 * 60 * 60 + 23 * 60 * 60) * 1000,
  );
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(saleEndsAt));

  useEffect(() => {
    const interval = setInterval(
      () => setTimeLeft(getTimeLeft(saleEndsAt)),
      1000,
    );
    return () => clearInterval(interval);
  }, [saleEndsAt]);

  return (
    <section
      aria-labelledby="flash-sales-heading"
      className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-sm bg-brand px-3 py-1 text-xs font-medium text-brand-foreground">
            Today's
          </span>
          <div className="flex items-center gap-8">
            <h2
              id="flash-sales-heading"
              className="text-2xl font-bold sm:text-3xl"
            >
              Flash Sales
            </h2>
            <div className="flex items-center gap-3">
              <CountdownUnit label="Days" value={timeLeft.days} />
              <span className="text-xl font-bold text-brand">:</span>
              <CountdownUnit label="Hours" value={timeLeft.hours} />
              <span className="text-xl font-bold text-brand">:</span>
              <CountdownUnit label="Minutes" value={timeLeft.minutes} />
              <span className="text-xl font-bold text-brand">:</span>
              <CountdownUnit label="Seconds" value={timeLeft.seconds} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Previous products"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Next products"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {FLASH_SALE_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Button className="bg-brand px-10 text-brand-foreground hover:bg-brand/90">
          View All Products
        </Button>
      </div>

      <hr className="mt-6 border-border" />
    </section>
  );
}
