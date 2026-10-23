import { Github } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { changelogData } from "../data/Changelog";

/* ── commit type → doodle badge (conventional commits) ─────── */
const CATEGORIES: { test: RegExp; label: string; bg: string }[] = [
  { test: /^feat\b/i, label: "feat", bg: "bg-emerald-200" },
  { test: /^fix\b/i, label: "fix", bg: "bg-red-200" },
  { test: /^style\b/i, label: "style", bg: "bg-purple-200" },
  { test: /^refactor\b/i, label: "refactor", bg: "bg-blue-200" },
  { test: /^perf\b/i, label: "perf", bg: "bg-cyan-200" },
  { test: /^docs\b/i, label: "docs", bg: "bg-yellow-200" },
  { test: /^chore\b/i, label: "chore", bg: "bg-slate-200" },
  { test: /^merge\b/i, label: "merge", bg: "bg-pink-200" },
];
const FALLBACK = { label: "misc", bg: "bg-gray-200" };

const categoryOf = (message: string) =>
  CATEGORIES.find((c) => c.test.test(message)) ?? FALLBACK;

const AUTHOR = "homayounmmdy";

/* ── "last updated" → derived from the newest `updatedAt` ──── */
const formatUpdatedAt = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { date: "—", time: "—" };

  const date = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return { date, time };
};

const LAST_UPDATED = (() => {
  // first release that declares updatedAt wins — keep the newest on top
  const iso = changelogData.find((r) => r.updatedAt)?.updatedAt;
  // fallback: if you never set updatedAt, use "now" at build/load time
  return formatUpdatedAt(iso ?? new Date().toISOString());
})();

/* ── component ──────────────────────────────────────────────── */
const Changelog = () => {
  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#2D2D2D] font-comic">
      <div className="max-w-6xl mx-auto p-6 h-full space-y-5">
        <PageHeader title="Changelog">
          <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-[#4A4A4A]">
            Every scribble, doodle and bug squashed on the way — newest at the
            top, oldest at the bottom.
          </p>

          <a
            href="https://github.com/homayunmmdy/SnappText"
            target="_blank"
            rel="noreferrer"
            className="mb-5 inline-flex items-center gap-2 rounded-xl border-2 border-[#2D2D2D] bg-white px-3 py-2 font-comic-bold text-xs uppercase tracking-[0.5px] transition-all duration-150 hover:-translate-y-0.5"
            style={{ boxShadow: "3px 3px 0 #2D2D2D" }}
          >
            <Github className="h-4 w-4" />
            View source
          </a>
        </PageHeader>

        {/* ── timeline ───────────────────────────────────── */}
        <div className="relative">
          {/* dashed rail */}
          <div
            aria-hidden
            className="absolute left-1.5 top-2 bottom-2 w-0 border-l-4 border-dashed border-[#2D2D2D]/50"
          />

          <div className="space-y-6 md:space-y-8">
            {changelogData.map((release) => (
              <section key={release.label} className="relative flex gap-4">
                {/* node */}
                <div className="flex w-4 shrink-0 justify-center">
                  <span className="mt-6 h-4 w-4 shrink-0 rounded-full border-[3px] border-[#2D2D2D] bg-[#FFD93D]" />
                </div>

                {/* card */}
                <div className="card min-w-0 flex-1 p-5 md:p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <h2 className="card-title mb-0 text-lg md:text-xl">
                      {release.note && (
                        <span className="mr-1 text-[#FF6B6B]">
                          {release.note} ·
                        </span>
                      )}
                      {release.label}
                    </h2>
                    <span className="badge badge-primary font-comic-bold text-[0.65rem] uppercase tracking-[0.5px]">
                      {release.commits.length}{" "}
                      {release.commits.length === 1 ? "commit" : "commits"}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {release.commits.map((commit, i) => {
                      const cat = categoryOf(commit.message);
                      return (
                        <li
                          key={`${release.label}-${i}`}
                          className="flex items-start gap-3"
                        >
                          <span
                            className={`badge ${cat.bg} mt-0.5 inline-flex shrink-0 items-center justify-center !px-2 !py-0.5 font-comic-bold text-[0.6rem] uppercase tracking-[0.5px]`}
                          >
                            {cat.label}
                          </span>

                          <div className="min-w-0">
                            <p className="break-words font-comic-bold text-sm leading-snug text-[#2D2D2D] md:text-[0.95rem]">
                              {commit.message}
                            </p>

                            <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 font-comic text-[0.72rem] text-[#4A4A4A]/80 md:text-xs">
                              <span>{AUTHOR}</span>
                              <span aria-hidden>·</span>
                              <span>
                                {commit.verb ?? "committed"} {commit.when}
                              </span>
                              {commit.verified && (
                                <span className="badge badge-primary !px-1.5 !py-0 font-comic-bold text-[0.55rem] uppercase tracking-[0.5px]">
                                  verified
                                </span>
                              )}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* ── last updated stamp ─────────────────────────── */}
        <footer className="mt-14">
          <div className="card rotate-[-0.6deg] p-5 md:p-7">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="card-title mb-1 text-lg md:text-xl">
                  Changelog last updated
                </p>
                <p className="card-text">
                  This page was refreshed on{" "}
                  <strong className="font-comic-bold text-[#2D2D2D]">
                    {LAST_UPDATED.date}
                  </strong>{" "}
                  at{" "}
                  <strong className="font-comic-bold text-[#2D2D2D]">
                    {LAST_UPDATED.time}
                  </strong>{" "}
                  (local time).
                </p>
              </div>
              <span className="badge badge-warning shrink-0 font-comic-bold text-[0.65rem] uppercase tracking-[0.5px]">
                fresh ink
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Changelog;
