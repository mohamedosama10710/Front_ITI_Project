// components/Logo.tsx
import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      {/* Icon: Modern Arch Door / Shopping Symbol */}
      <div className="relative flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-md shadow-red-500/20 transition-transform group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 text-white"
        >
          {/* Outer Door Arch */}
          <path d="M6 21V10a6 6 0 0 1 12 0v11" />
          {/* Shopping handle / knob */}
          <circle cx="15" cy="14" r="1" fill="currentColor" />
          {/* Ground line */}
          <path d="M4 21h16" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <span className="text-xl font-extrabold tracking-tight text-foreground">
          Bab<span className="text-brand text-[#DB4444]">Rizk</span>
        </span>
        <span className="text-[9px] font-semibold tracking-widest text-muted-foreground uppercase mt-0.5">
          Store
        </span>
      </div>
    </Link>
  );
}