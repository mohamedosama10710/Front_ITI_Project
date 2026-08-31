import { useState } from "react";
import { Eye, ShoppingCart, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Data --------------------------------------------------------------------
// Temporary mock data + local state. Once the wishlist Redux slice exists,
// this page will read/dispatch from the store instead.

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
}

interface SuggestedProduct {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
  image: string;
}

const SUGGESTED_PRODUCTS: SuggestedProduct[] = [
  {
    id: "s1",
    title: "ASUS FHD Gaming Laptop",
    price: 960,
    oldPrice: 1160,
    rating: 5,
    reviewsCount: 65,
    image: "https://placehold.co/300x300/f5f5f5/1a1a1a?text=Laptop",
  },
  {
    id: "s2",
    title: "IPS LCD Gaming Monitor",
    price: 1160,
    rating: 5,
    reviewsCount: 65,
    image: "https://placehold.co/300x300/f5f5f5/1a1a1a?text=Monitor",
  },
  {
    id: "s3",
    title: "HAVIT HV-G92 Gamepad",
    price: 560,
    isNew: true,
    rating: 5,
    reviewsCount: 65,
    image: "https://placehold.co/300x300/f5f5f5/1a1a1a?text=Gamepad",
  },
  {
    id: "s4",
    title: "AK-900 Wired Keyboard",
    price: 200,
    rating: 5,
    reviewsCount: 65,
    image: "https://placehold.co/300x300/f5f5f5/1a1a1a?text=Keyboard",
  },
];

function discountPercent(price: number, oldPrice?: number) {
  if (!oldPrice || oldPrice <= price) return undefined;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

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

// --- Wishlist item card -------------------------------------------------------

function WishlistCard({
  item,
  onRemove,
}: {
  item: WishlistItem;
  onRemove: (id: string) => void;
}) {
  const discount = discountPercent(item.price, item.oldPrice);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-md bg-secondary">
        {discount ? (
          <span className="absolute top-3 left-3 z-10 rounded-sm bg-brand px-2.5 py-1 text-xs font-medium text-brand-foreground">
            -{discount}%
          </span>
        ) : null}

        <button
          type="button"
          aria-label={`Remove ${item.title} from wishlist`}
          onClick={() => onRemove(item.id)}
          className="absolute top-3 right-3 z-10 flex size-7 items-center justify-center rounded-full bg-background text-foreground hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </button>

        <img
          src={item.image}
          alt={item.title}
          className="size-full object-cover"
          loading="lazy"
        />

        <button
          type="button"
          className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-foreground py-2 text-sm font-medium text-background"
        >
          <ShoppingCart className="size-4" />
          Add To Cart
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="truncate text-sm font-medium">{item.title}</p>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-brand">${item.price}</span>
          {item.oldPrice ? (
            <span className="text-sm text-muted-foreground line-through">
              ${item.oldPrice}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// --- Suggested product card ---------------------------------------------------

function SuggestionCard({ product }: { product: SuggestedProduct }) {
  const discount = discountPercent(product.price, product.oldPrice);

  return (
    <div className="group flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-md bg-secondary">
        {discount ? (
          <span className="absolute top-3 left-3 z-10 rounded-sm bg-brand px-2.5 py-1 text-xs font-medium text-brand-foreground">
            -{discount}%
          </span>
        ) : product.isNew ? (
          <span className="absolute top-3 left-3 z-10 rounded-sm bg-emerald-500 px-2.5 py-1 text-xs font-medium text-white">
            NEW
          </span>
        ) : null}

        <button
          type="button"
          aria-label="Quick view"
          className="absolute top-3 right-3 z-10 flex size-7 items-center justify-center rounded-full bg-background text-foreground hover:text-brand"
        >
          <Eye className="size-4" />
        </button>

        <img
          src={product.image}
          alt={product.title}
          className="size-full object-cover"
          loading="lazy"
        />

        <button
          type="button"
          className="absolute inset-x-0 bottom-0 translate-y-full bg-foreground py-2 text-sm font-medium text-background transition-transform duration-200 group-hover:translate-y-0 group-focus-within:translate-y-0"
        >
          Add To Cart
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.title}</p>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-brand">
            ${product.price}
          </span>
          {product.oldPrice ? (
            <span className="text-sm text-muted-foreground line-through">
              ${product.oldPrice}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">
            ({product.reviewsCount})
          </span>
        </div>
      </div>
    </div>
  );
}

// --- Page --------------------------------------------------------------------

export default function Wishlist() {
  // Starts empty: items only appear once the user actually adds them (e.g.
  // via the heart icon on a product card elsewhere). Will be replaced by the
  // wishlist Redux slice once it exists.
  const [items, setItems] = useState<WishlistItem[]>([]);

  function handleRemove(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function handleMoveAllToBag() {
    // TODO: dispatch each item into the cart slice once it exists.
    console.log("move all to bag:", items);
  }

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-14 px-4 py-10">
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-medium">Wishlist ({items.length})</h1>
          {items.length > 0 ? (
            <Button variant="outline" onClick={handleMoveAllToBag}>
              Move All To Bag
            </Button>
          ) : null}
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <WishlistCard key={item.id} item={item} onRemove={handleRemove} />
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="h-6 w-2.5 rounded-sm bg-brand" aria-hidden />
            <h2 className="text-xl font-medium">Just For You</h2>
          </div>
          <Button variant="outline">See All</Button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {SUGGESTED_PRODUCTS.map((product) => (
            <SuggestionCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
