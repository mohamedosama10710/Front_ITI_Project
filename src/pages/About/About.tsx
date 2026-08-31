import { useRef, useState, type SVGProps } from "react";
import {
  DollarSign,
  Headset,
  ShieldCheck,
  Store,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data --------------------------------------------------------------------

const STATS = [
  { icon: Store, value: "10.5k", label: "Sellers active our site" },
  { icon: DollarSign, value: "33k", label: "Monthly Product Sale" },
  { icon: Users, value: "45.5k", label: "Customer active in our site" },
  { icon: Wallet, value: "25k", label: "Annual gross sale in our site" },
];

// Placeholder team roster. Swap for the real team's names/photos/roles.
const TEAM = [
  { name: "Sarah Ahmed", role: "Founder & Chairman" },
  { name: "Karim Hassan", role: "Managing Director" },
  { name: "Layla Mostafa", role: "Product Designer" },
  { name: "Omar Fathy", role: "Engineering Lead" },
  { name: "Nour Ibrahim", role: "Marketing Lead" },
];

const FEATURES = [
  {
    icon: Truck,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140",
  },
  {
    icon: Headset,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support",
  },
  {
    icon: ShieldCheck,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days",
  },
];

// lucide-react has no brand logos, so these are small local SVGs (same
// approach used in Footer.tsx).
function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.7 11.7 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.2Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-.9 1.8-1.9 3.7-1.9 4 0 4.7 2.5 4.7 5.8V21h-4v-5.7c0-1.4 0-3.1-1.9-3.1-1.9 0-2.2 1.5-2.2 3v5.8h-4V9Z" />
    </svg>
  );
}

const TEAM_SOCIAL_ICONS = [TwitterIcon, InstagramIcon, LinkedinIcon];

// --- Team carousel -------------------------------------------------------

function TeamCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
    setActiveIndex(index);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.children[0]?.clientWidth ?? 1;
    const gap = 32; // matches gap-8 below
    const index = Math.round(track.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, TEAM.length - 1));
  }

  return (
    <div className="flex flex-col gap-8">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TEAM.map(({ name, role }, index) => (
          <div
            key={name}
            className="flex w-[85%] shrink-0 snap-start flex-col gap-3 sm:w-[45%] lg:w-[calc(33.333%-1.4rem)]"
          >
            <div className="h-[350px] overflow-hidden rounded bg-secondary">
              <img
                src={`https://placehold.co/400x500/f5f5f5/1a1a1a?text=${encodeURIComponent(name)}`}
                alt={name}
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
            <div className="flex items-center gap-3">
              {TEAM_SOCIAL_ICONS.map((Icon, iconIndex) => (
                <a
                  key={iconIndex}
                  href="#"
                  aria-label={`${name} on social media`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
            <span className="sr-only">{`Slide ${index + 1} of ${TEAM.length}`}</span>
          </div>
        ))}
      </div>

      <div
        className="flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Team slides"
      >
        {TEAM.map((member, index) => (
          <button
            key={member.name}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => scrollToIndex(index)}
            className={cn(
              "size-2.5 rounded-full transition-colors",
              index === activeIndex ? "bg-brand" : "bg-border",
            )}
          />
        ))}
      </div>
    </div>
  );
}

// --- Page ------------------------------------------------------------------

export default function About() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-20 px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground">
          Home
        </a>{" "}
        / <span className="font-medium text-foreground">About</span>
      </nav>

      <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold">Our Story</h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            Launched in 2015, Bab Rizk is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data, and service solutions, Bab
            Rizk has 10,500 sellers and 300 brands and serves 3 million
            customers across the region.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Bab Rizk has more than 1 million products to offer, growing at a
            very fast pace. Bab Rizk offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <img
          src="https://placehold.co/700x460/f9a8c5/1a1a1a?text=Our+Story"
          alt="Team members shopping together"
          className="h-[400px] w-full rounded object-cover"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ icon: Icon, value, label }, index) => {
          const highlighted = index === 1;
          return (
            <div
              key={label}
              className={cn(
                "flex flex-col items-center gap-3 rounded border p-6 text-center",
                highlighted
                  ? "border-transparent bg-brand text-brand-foreground"
                  : "border-border",
              )}
            >
              <div
                className={cn(
                  "flex size-12 items-center justify-center rounded-full",
                  highlighted
                    ? "bg-brand-foreground/15"
                    : "bg-foreground text-background",
                )}
              >
                <Icon className="size-5" />
              </div>
              <h3 className="text-3xl font-bold">{value}</h3>
              <p className="text-sm">{label}</p>
            </div>
          );
        })}
      </section>

      <section aria-label="Our team">
        <TeamCarousel />
      </section>

      <section className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-3 text-center"
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-foreground text-background">
              <Icon className="size-6" />
            </div>
            <h3 className="text-sm font-bold">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
