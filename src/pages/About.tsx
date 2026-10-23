import {
  BookOpen,
  Code2,
  Copy,
  Database,
  Github,
  Layers,
  Palette,
  Sparkles,
  Zap,
} from "lucide-react";

const AUTHOR = "homayounmmdy";
const REPO = "https://github.com/homayunmmdy/SnappText";

/* ── content ───────────────────────────────────────────────── */

const features = [
  {
    icon: <Layers />,
    title: "Snippets, organized",
    text: "Save any block of text — emails, code, replies — and find it again in seconds.",
    tint: "bg-blue-200",
  },
  {
    icon: <Sparkles />,
    title: "Variables, built in",
    text: "Drop {{name}} or {{company}} into a snippet and fill them in when you paste.",
    tint: "bg-yellow-200",
  },
  {
    icon: <Copy />,
    title: "One-click copy",
    text: "Copy a snippet straight to your clipboard — placeholders included.",
    tint: "bg-emerald-200",
  },
  {
    icon: <Zap />,
    title: "Instant, offline",
    text: "Everything runs in your browser. No sign-up, no server, no waiting.",
    tint: "bg-pink-200",
  },
  {
    icon: <Database />,
    title: "Yours alone",
    text: "Snippets live in localStorage. Export any time as plain JSON.",
    tint: "bg-orange-200",
  },
  {
    icon: <Palette />,
    title: "Doodle by design",
    text: "Taped cards, wobbly borders and a sketch font — because tools can be fun.",
    tint: "bg-purple-200",
  },
];

const stack = [
  { label: "React 18", bg: "bg-cyan-200" },
  { label: "TypeScript", bg: "bg-blue-200" },
  { label: "Tailwind CSS", bg: "bg-emerald-200" },
  { label: "react-hook-form", bg: "bg-pink-200" },
  { label: "Zod", bg: "bg-yellow-200" },
  { label: "lucide-react", bg: "bg-purple-200" },
  { label: "react-hot-toast", bg: "bg-orange-200" },
  { label: "localStorage", bg: "bg-slate-200" },
];

const links = [
  {
    href: "/store",
    label: "Snippet Store",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    href: "/changelog",
    label: "Changelog",
    icon: <BookOpen className="h-4 w-4" />,
  },
  { href: "/admin", label: "Admin", icon: <Database className="h-4 w-4" /> },
];

/* ── page ──────────────────────────────────────────────────── */

const About = () => {
  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#2D2D2D] font-comic">
      <div className="max-w-6xl mx-auto p-6 h-full space-y-5">
        {/* ── hero ─────────────────────────────────────────── */}
        <header>
          <h1 className="font-sketch text-5xl md:text-6xl leading-none">
            About SnappText
          </h1>

          <svg
            aria-hidden
            viewBox="0 0 240 16"
            className="mt-2 h-4 w-48 md:w-64"
            fill="none"
          >
            <path
              d="M2 9C30 2 60 16 90 9s60-7 90 0 40 7 58-1"
              stroke="#FF6B6B"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-[#4A4A4A]">
            A tiny snippet manager for the things you write every day — cold
            emails, code blocks, replies you retype one too many times. Paste it
            once, reuse it forever.
          </p>
        </header>

        {/* ── story card ──────────────────────────────────── */}
        <section className="card p-5 md:p-7">
          <h2 className="card-title mb-3 text-xl md:text-2xl">
            Why I built it
          </h2>
          <div className="space-y-3 card-text">
            <p>
              I kept rewriting the same emails. The same intros, the same
              follow-ups, the same "thanks for the meeting" — copy-pasting from
              an old draft folder, retyping the variable parts by hand. Text
              expanders felt heavy. Note apps felt bloated.
            </p>
            <p>
              SnappText is the tool I actually wanted:{" "}
              <strong className="font-comic-bold text-[#2D2D2D]">
                a bare-bones library of snippets, variable support, one click to
                copy, and nothing else.
              </strong>{" "}
              No accounts. No sync. No subscription. Just your text, one click
              away.
            </p>
            <p>
              The doodle design came later — I wanted a tool that felt like a
              notebook, not a SaaS dashboard. Taped cards, wobbly borders, a
              sketch font. Turns out small tools can be fun too.
            </p>
          </div>
        </section>

        {/* ── features grid ────────────────────────────────── */}
        <section>
          <h2 className="font-sketch text-3xl md:text-4xl mb-4">
            What's inside
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <article key={f.title} className="card flex flex-col p-5">
                <div
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#2D2D2D] ${f.tint}`}
                >
                  <span className="h-4 w-4 text-[#2D2D2D]">{f.icon}</span>
                </div>
                <h3 className="card-title mb-1 text-lg">{f.title}</h3>
                <p className="card-text">{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── tech stack ───────────────────────────────────── */}
        <section className="card p-5 md:p-7">
          <h2 className="card-title mb-1 text-xl md:text-2xl">
            <Code2 className="mr-2 inline h-5 w-5" /> Under the hood
          </h2>
          <p className="card-text mb-4">
            Small stack, boring choices — on purpose. Everything is typed,
            tested by hand, and deployed as static files.
          </p>
          <div className="flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s.label}
                className={`badge ${s.bg} font-comic-bold text-[0.65rem] uppercase tracking-[0.5px]`}
              >
                {s.label}
              </span>
            ))}
          </div>
        </section>

        {/* ── quick links ──────────────────────────────────── */}
        <section>
          <h2 className="font-sketch text-3xl md:text-4xl mb-4">
            Keep exploring
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="card group flex items-center gap-3 p-4 no-underline"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[3px] border-[#2D2D2D] bg-[#FFD93D] text-[#2D2D2D]">
                  {l.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-comic-bold text-sm text-[#2D2D2D]">
                    {l.label}
                  </span>
                  <span className="block font-comic text-[0.65rem] text-[#4A4A4A]">
                    {l.href}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="font-sketch text-xl text-[#4A4A4A] transition-transform duration-150 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── source / contact card ────────────────────────── */}
        <section className="card rotate-[0.4deg] p-5 md:p-7">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="card-title mb-1 text-lg md:text-xl">
                Built by {AUTHOR}
              </p>
              <p className="card-text">
                SnappText is open source under the MIT license. Bug reports,
                feature requests and pull requests are all welcome.
              </p>
            </div>
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border-2 border-[#2D2D2D] bg-white px-3 py-2 font-comic-bold text-xs uppercase tracking-[0.5px] transition-all duration-150 hover:-translate-y-0.5"
              style={{ boxShadow: "3px 3px 0 #2D2D2D" }}
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
