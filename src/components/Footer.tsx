import { useState, type SVGProps } from "react";
import { ArrowUp, Send } from "lucide-react";

const SUPPORT_INFO = {
  address: "111 Bijoy sarani, Dhaka,\nDH 1515, Bangladesh.",
  email: "exclusive@gmail.com",
  phone: "+88015-88888-9999",
};

const ACCOUNT_LINKS = [
  { label: "My Account", href: "/account" },
  { label: "Login / Register", href: "/login" },
  { label: "Cart", href: "/cart" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Shop", href: "/" },
];

const QUICK_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms Of Use", href: "/terms-of-use" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.95 2 14.66 2 11.98 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
    </svg>
  );
}

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

const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Twitter", href: "#", Icon: TwitterIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
];

function FooterLinkList({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <ul className="flex flex-col gap-3 text-sm text-primary-foreground/70">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className="hover:text-primary-foreground">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScrollToTopButton() {
  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-6 bottom-6 z-40 flex size-11 items-center justify-center rounded-full bg-foreground text-background shadow-md hover:opacity-90"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("subscribe:", email);
    setEmail("");
  }

  return (
    <>
      <ScrollToTopButton />

      <footer className="w-full bg-black text-white">
        <div className="container mx-auto grid grid-cols-2 gap-10  py-16 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-5 sm:col-span-1">
            <a href="/" className="text-lg font-bold">
              Bab Rizk
            </a>
            <h3 className="text-lg font-medium">Subscribe</h3>
            <p className="text-sm text-primary-foreground/70">
              Get 10% off your first order
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <label className="relative w-full max-w-52">
                <span className="sr-only">Your email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-sm border border-primary-foreground/40 bg-transparent py-2.5 pr-10 pl-3 text-sm outline-none placeholder:text-primary-foreground/60 focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                >
                  <Send className="size-4" />
                </button>
              </label>
            </form>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium">Support</h3>
            <p className="text-sm whitespace-pre-line text-primary-foreground/70">
              {SUPPORT_INFO.address}
            </p>
            <a
              href={`mailto:${SUPPORT_INFO.email}`}
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
            >
              {SUPPORT_INFO.email}
            </a>
            <a
              href={`tel:${SUPPORT_INFO.phone.replace(/[^+\d]/g, "")}`}
              className="text-sm text-primary-foreground/70 hover:text-primary-foreground"
            >
              {SUPPORT_INFO.phone}
            </a>
          </div>

          <FooterLinkList title="Account" links={ACCOUNT_LINKS} />
          <FooterLinkList title="Quick Link" links={QUICK_LINKS} />

          <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
            <h3 className="text-lg font-medium">Download App</h3>
            <p className="text-xs text-primary-foreground/70">
              Save $3 with App New User Only
            </p>
            <div className="flex items-center gap-3">
              {}
              <div
                aria-hidden
                className="flex size-16 shrink-0 items-center justify-center rounded-sm bg-primary-foreground/10 text-[10px] text-primary-foreground/50"
              >
                <img className="w-16 h-16" src="/logos/Qr.jpg" alt="" />
              </div>
              <div className="flex flex-col gap-1.5">
                {}
                <a
                  href="#"
                  className="flex  items-center gap-1.5 rounded-sm border border-primary-foreground/40 px-2 py-1 text-[11px]"
                >
                  <img className="w-full" src="/logos/playstore.svg" alt="" />
                </a>
                <a
                  href="#"
                  className="flex items-center gap-1.5 rounded-sm border border-primary-foreground/40 px-2 py-1 text-[11px]"
                >
                  <img className="w-full" src="/logos/appstore.svg" alt="" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="hover:text-primary-foreground/70"
                >
                  <Icon className="size-4.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 py-6">
          <p className="text-center text-xs text-primary-foreground/50">
            © Copyright Bab Rizk {new Date().getFullYear()}. All right reserved
          </p>
        </div>
      </footer>
    </>
  );
}
