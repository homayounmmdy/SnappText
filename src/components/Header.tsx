import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../Utility/util";
import AddSnippetBtn from "./AddSnippetBtn.tsx";

const NAV_LINKS = [
  { href: "/store", label: "Store" },
  { href: "/changelog", label: "Changelog" },
  { href: "/admin", label: "Admin" },
  { href: "/about", label: "About" },
];

const NavLinks = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-wrap items-center gap-1.5" aria-label="Primary">
      {NAV_LINKS.map((link) => {
        // exact match OR nested path, e.g. /store/xyz
        const active =
          pathname === link.href || pathname.startsWith(link.href + "/");
        return (
          <Link
            key={link.href}
            to={link.href}
            aria-current={active ? "page" : undefined}
            className={[
              "px-3 py-1.5 border-2 border-black rounded-full font-comic-bold text-[0.65rem] uppercase tracking-[0.5px] transition-all duration-150",
              active
                ? "bg-emerald-300 shadow-[2px_2px_0_#000]"
                : "bg-white hover:-translate-y-0.5 hover:shadow-[2px_2px_0_#000]",
            ].join(" ")}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

/* ── header ────────────────────────────────────────────────── */
const Header = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { dispatch } = context;

  return (
    <header className="bg-yellow-300 text-gray-900 p-6 relative overflow-hidden">
      {/* Doodle background patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="doodles"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="2" fill="currentColor" />
              <circle cx="80" cy="60" r="3" fill="currentColor" />
              <path
                d="M 40 40 Q 45 35, 50 40"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              />
              <path
                d="M 70 20 L 75 25 L 70 30"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodles)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* row 1 — logo + (nav on desktop) + add button */}
        <div className="flex justify-between items-center gap-4">
          <div className="min-w-0">
            <Link
              to="/"
              className="text-2xl font-sketch md:text-3xl font-bold relative inline-block"
            >
              <h1 className="relative z-10">Snapp Text</h1>
              {/* Hand-drawn underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 0 4 Q 25 2, 50 4 T 100 4"
                  stroke="#ef4444"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            <p className="text-gray-700 font-comic-bold hidden md:block mt-3 font-medium">
              Quick snippets, instant copy ✨
            </p>
          </div>

          {/* nav: desktop, middle */}
          <div className="hidden md:block">
            <NavLinks />
          </div>

          <AddSnippetBtn handleClick={() => dispatch({ type: "OPEN_FORM" })} />
        </div>

        {/* row 2 — nav on mobile only */}
        <div className="mt-4 md:hidden">
          <NavLinks />
        </div>
      </div>

      {/* Wavy bottom border */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 10 Q 250 0, 500 10 T 1000 10 T 1500 10 T 2000 10 L 2000 20 L 0 20 Z"
          fill="#fef3c7"
        />
      </svg>
    </header>
  );
};

export default Header;
