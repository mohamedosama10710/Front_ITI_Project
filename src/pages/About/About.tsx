import { useRef, useState, type SVGProps } from "react";
import {
  DollarSign,
  Headset,
  ShieldCheck,
  Store,
  Truck,
  Users,
 // أو استخدام أيقونة حقيبة تسوق للـ Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Data --------------------------------------------------------------------

const STATS = [
  { icon: Store, value: "10.5k", label: "Sellers active our site" },
  { icon: DollarSign, value: "33k", label: "Monthly Product Sale" },
  { icon: Users, value: "45.5k", label: "Customer active in our site" },
  { icon: DollarSign, value: "25k", label: "Annual gross sale in our site" },
];

const TEAM = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
    image: "/header/image 46.jpg", // استبدل بمسار الصورة لديك
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    image: "/header/image 51.jpg", // استبدل بمسار الصورة لديك
  },
  {
    name: "Will Smith",
    role: "Product Designer",
    image: "/header/image 47.jpg", // استبدل بمسار الصورة لديك
  },
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

// --- Team Carousel / Grid ----------------------------------------------------

function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(2); // النقطة الحمراء بالمنتصف كما بالصورة

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TEAM.map(({ name, role, image }) => (
          <div key={name} className="flex flex-col gap-4 text-left">
            <div className="h-[380px] w-full overflow-hidden rounded bg-[#F5F5F5] flex items-end justify-center">
              <img
                src={image}
                alt={name}
                className="h-full object-contain mix-blend-multiply"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-bold tracking-wider">{name}</h3>
              <p className="text-sm text-gray-600">{role}</p>
            </div>
            <div className="flex items-center gap-4">
              {TEAM_SOCIAL_ICONS.map((Icon, iconIndex) => (
                <a
                  key={iconIndex}
                  href="#"
                  aria-label={`${name} on social media`}
                  className="text-black hover:text-[#DB4444] transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-3">
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "size-3 rounded-full transition-all border",
              index === activeIndex
                ? "bg-[#DB4444] border-[#DB4444] outline outline-2 outline-offset-2 outline-[#DB4444]/30"
                : "bg-gray-300 border-transparent"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// --- Page Component ----------------------------------------------------------

export default function About() {
  return (
    <main className="mx-auto flex container flex-col gap-28 px-4 sm:px-8 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
        <a href="/" className="hover:text-black">
          Home
        </a>{" "}
        / <span className="font-medium text-black">About</span>
      </nav>

      {/* Our Story Section */}
      <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-8 max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-wider">
            Our Story
          </h1>
          <p className="text-base leading-relaxed text-black">
            Launced in 2015, Exclusive is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sellers and 300 brands and serves 3 millions customers
            across the region.
          </p>
          <p className="text-base leading-relaxed text-black">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="w-full h-[450px] overflow-hidden rounded">
          <img
            src="header/story.jpg" // ضع مسار صورة الفتاتين مع أكياس التسوق هنا
            alt="Our Story Shopping"
            className="size-full object-cover"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ icon: Icon, value, label }, index) => {
          const highlighted = index === 1; // الكارت الثاني مميز باللون الأحمر
          return (
            <div
              key={label}
              className={cn(
                "flex flex-col items-center justify-center gap-3 rounded border py-8 px-4 text-center transition-all group cursor-pointer",
                highlighted
                  ? "bg-[#DB4444] text-white border-[#DB4444] shadow-lg"
                  : "border-gray-300 hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444]"
              )}
            >
              {/* Outer Ring Icon Frame */}
              <div
                className={cn(
                  "flex size-16 items-center justify-center rounded-full transition-colors",
                  highlighted
                    ? "bg-white/30 text-white"
                    : "bg-gray-300 text-black group-hover:bg-white/30 group-hover:text-white"
                )}
              >
                <div
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full transition-colors",
                    highlighted
                      ? "bg-white text-black"
                      : "bg-black text-white group-hover:bg-white group-hover:text-black"
                  )}
                >
                  <Icon className="size-6" />
                </div>
              </div>
              <h3 className="text-3xl font-bold tracking-wider mt-2">{value}</h3>
              <p className="text-sm font-normal">{label}</p>
            </div>
          );
        })}
      </section>

      {/* Team Section */}
      <section aria-label="Our team">
        <TeamSection />
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-3 py-10">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-4 text-center"
          >
            {/* Double Circle Icon Frame */}
            <div className="flex size-20 items-center justify-center rounded-full bg-gray-300">
              <div className="flex size-14 items-center justify-center rounded-full bg-black text-white">
                <Icon className="size-8" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-bold uppercase tracking-wider">
                {title}
              </h3>
              <p className="text-xs text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}