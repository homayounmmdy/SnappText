import {
  AlertTriangle,
  BarChart3,
  Calendar,
  Copy,
  Download,
  HardDrive,
  Hash,
  Layers,
  Trash2,
  Type,
  Upload,
  X,
} from "lucide-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  AppContext,
  copyToClipboard,
  extractPlaceholders,
} from "../Utility/util";
import { notify } from "../components/Notify";

const STORAGE_LIMIT = 5 * 1024 * 1024;

const getBreakdown = () => {
  const rows: { key: string; bytes: number }[] = [];
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    const value = localStorage.getItem(key) ?? "";
    const bytes = (key.length + value.length) * 2; // UTF-16
    total += bytes;
    rows.push({ key, bytes });
  }
  rows.sort((a, b) => b.bytes - a.bytes);
  return { rows, total };
};

const formatBytes = (n: number) => {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
};

const formatDate = (d: Date | string) => {
  const date = new Date(d);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const relativeTime = (d: Date | string) => {
  const t = new Date(d).getTime();
  if (isNaN(t)) return "—";
  const mins = Math.floor((Date.now() - t) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(d);
};

/* ── page ───────────────────────────────────────────────────── */

const Admin = () => {
  const context = useContext(AppContext);
  const [storage, setStorage] = useState(getBreakdown);
  const [confirmClear, setConfirmClear] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  // re-read localStorage after the persist effect has run
  useEffect(() => {
    const id = setTimeout(() => setStorage(getBreakdown()), 0);
    return () => clearTimeout(id);
  }, [context?.state.snippets]);

  if (!context) return null;
  const { state, dispatch } = context;

  const stats = useMemo(() => {
    const snippets = state.snippets;
    const total = snippets.length;
    const totalChars = snippets.reduce((n, s) => n + s.description.length, 0);
    const avgChars = total ? Math.round(totalChars / total) : 0;

    const placeholderCounts = new Map<string, number>();
    let withPlaceholders = 0;
    snippets.forEach((s) => {
      const ph = extractPlaceholders(s.description);
      if (ph.length) withPlaceholders++;
      ph.forEach((p) =>
        placeholderCounts.set(p, (placeholderCounts.get(p) ?? 0) + 1),
      );
    });

    const topPlaceholders = [...placeholderCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    const totalPhUses = [...placeholderCounts.values()].reduce(
      (a, b) => a + b,
      0,
    );

    const dates = snippets
      .map((s) => new Date(s.createdAt).getTime())
      .filter((t) => !isNaN(t));
    const oldest = dates.length ? Math.min(...dates) : null;
    const newest = dates.length ? Math.max(...dates) : null;

    return {
      total,
      totalChars,
      avgChars,
      withPlaceholders,
      topPlaceholders,
      totalPhUses,
      uniquePh: placeholderCounts.size,
      oldest,
      newest,
    };
  }, [state.snippets]);

  const usedPct = Math.min(100, (storage.total / STORAGE_LIMIT) * 100);
  const remaining = Math.max(0, STORAGE_LIMIT - storage.total);
  const barColor =
    usedPct >= 95
      ? "bg-red-500"
      : usedPct >= 80
        ? "bg-orange-400"
        : usedPct >= 50
          ? "bg-yellow-400"
          : "bg-emerald-400";

  const handleExport = () => {
    const data = JSON.stringify(
      {
        app: "SnappText",
        exportedAt: new Date().toISOString(),
        snippets: state.snippets,
      },
      null,
      2,
    );
    const url = URL.createObjectURL(
      new Blob([data], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `snapptext-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify.success("Backup downloaded.", { title: "Exported" });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        const incoming = Array.isArray(parsed) ? parsed : parsed?.snippets;
        if (!Array.isArray(incoming)) throw new Error("bad shape");
        const clean = incoming
          .filter(
            (s: any) =>
              s &&
              typeof s.title === "string" &&
              typeof s.description === "string",
          )
          .map((s: any) => ({
            id:
              s.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            title: s.title,
            description: s.description,
            createdAt: s.createdAt ? new Date(s.createdAt) : new Date(),
          }));
        if (!clean.length) throw new Error("empty");
        dispatch({
          type: "SET_SNIPPETS",
          snippets: [...state.snippets, ...clean],
        });
        notify.success(`Imported ${clean.length} snippets.`, { title: "Done" });
      } catch {
        notify.error("That file isn't a valid SnappText backup.", {
          title: "Import failed",
        });
      } finally {
        if (fileInput.current) fileInput.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    dispatch({ type: "CLEAR_SNIPPETS" });
    setConfirmClear(false);
    notify.success("All snippets deleted.", { title: "Cleared" });
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#2D2D2D] font-comic">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* header */}
        <header>
          <h1 className="font-sketch text-5xl md:text-6xl leading-none">
            Admin
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
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#4A4A4A]">
            Everything lives in your browser's{" "}
            <code className="rounded bg-white px-1 py-0.5 font-comic-bold text-[#2D2D2D]">
              localStorage
            </code>
            . This dashboard is a peek behind the curtain — no data ever leaves
            your device.
          </p>
        </header>

        {/* ── storage card ─────────────────────────────────── */}
        <section className="card p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="card-title mb-1 text-xl">
                <HardDrive className="mr-2 inline h-5 w-5" />
                Storage
              </h2>
              <p className="card-text">
                {formatBytes(storage.total)} of ~{formatBytes(STORAGE_LIMIT)}{" "}
                used
              </p>
            </div>
            <div className="text-right">
              <p className="font-sketch text-3xl leading-none">
                {usedPct.toFixed(1)}%
              </p>
              <p className="font-comic text-[0.7rem] text-[#4A4A4A]">
                {formatBytes(remaining)} left
              </p>
            </div>
          </div>

          <div className="relative h-6 w-full overflow-hidden rounded-full border-2 border-[#2D2D2D] bg-white">
            <div
              className={`h-full transition-all duration-500 ${barColor}`}
              style={{ width: `${usedPct}%` }}
            />
          </div>

          {usedPct >= 80 && (
            <p className="mt-3 flex items-center gap-2 font-comic-bold text-xs text-[#FF6B6B]">
              <AlertTriangle className="h-4 w-4" />
              Running low on space — consider exporting and removing old
              snippets.
            </p>
          )}

          {storage.rows.length > 0 && (
            <div className="mt-5 space-y-2">
              <p className="font-comic-bold text-[0.65rem] uppercase tracking-[0.5px] text-[#4A4A4A]">
                Breakdown by key
              </p>
              {storage.rows.map((row) => {
                const pct = (row.bytes / storage.total) * 100 || 0;
                return (
                  <div key={row.key} className="flex items-center gap-3">
                    <code className="w-40 shrink-0 truncate rounded border-2 border-[#2D2D2D] bg-white px-2 py-0.5 font-comic-bold text-[0.65rem]">
                      {row.key}
                    </code>
                    <div className="relative h-3 flex-1 overflow-hidden rounded-full border-2 border-[#2D2D2D] bg-white">
                      <div
                        className="h-full bg-[#FFD93D]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-16 shrink-0 text-right font-comic-bold text-[0.65rem] text-[#4A4A4A]">
                      {formatBytes(row.bytes)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── quick stats ──────────────────────────────────── */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            icon={<Layers />}
            label="Snippets"
            value={stats.total.toString()}
            tint="bg-blue-200"
          />
          <StatCard
            icon={<Type />}
            label="Characters"
            value={stats.totalChars.toLocaleString()}
            tint="bg-emerald-200"
          />
          <StatCard
            icon={<BarChart3 />}
            label="Avg / snippet"
            value={`${stats.avgChars}`}
            tint="bg-purple-200"
          />
          <StatCard
            icon={<Hash />}
            label="Placeholders"
            value={stats.totalPhUses.toString()}
            tint="bg-yellow-200"
          />
        </section>

        {/* ── two-column: chart + snippet list ─────────────── */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* placeholder frequency */}
          <section className="card p-5 md:p-6">
            <h2 className="card-title mb-1 text-xl">
              <Hash className="mr-2 inline h-5 w-5" /> Top placeholders
            </h2>
            <p className="card-text mb-4">
              {stats.uniquePh} unique across {stats.withPlaceholders} snippet
              {stats.withPlaceholders === 1 ? "" : "s"}.
            </p>

            {stats.topPlaceholders.length === 0 ? (
              <p className="font-comic text-sm text-[#4A4A4A]">
                No placeholders yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {stats.topPlaceholders.map(([name, count], i) => {
                  const max = stats.topPlaceholders[0][1];
                  const pct = (count / max) * 100;
                  return (
                    <li key={name} className="flex items-center gap-3">
                      <span className="w-5 font-sketch text-lg text-[#4A4A4A]">
                        {i + 1}
                      </span>
                      <code className="w-28 shrink-0 truncate rounded border-2 border-[#2D2D2D] bg-white px-2 py-0.5 font-comic-bold text-[0.65rem]">
                        {`{{${name}}}`}
                      </code>
                      <div className="relative h-3 flex-1 overflow-hidden rounded-full border-2 border-[#2D2D2D] bg-white">
                        <div
                          className="h-full bg-[#FF6B6B]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-6 shrink-0 text-right font-comic-bold text-[0.7rem]">
                        {count}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* snippet list */}
          <section className="card flex flex-col p-5 md:p-6">
            <h2 className="card-title mb-1 text-xl">
              <Calendar className="mr-2 inline h-5 w-5" /> Library
            </h2>
            <p className="card-text mb-4">
              {stats.oldest && stats.newest
                ? `From ${formatDate(stats.oldest)} to ${formatDate(stats.newest)}.`
                : "Nothing here yet."}
            </p>

            {state.snippets.length === 0 ? (
              <p className="font-comic text-sm text-[#4A4A4A]">
                Add a snippet from the library to see it here.
              </p>
            ) : (
              <ul className="max-h-96 space-y-2 overflow-y-auto pr-1">
                {[...state.snippets]
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime(),
                  )
                  .map((s) => {
                    const ph = extractPlaceholders(s.description).length;
                    return (
                      <li
                        key={s.id}
                        className="group flex items-center gap-2 rounded-xl border-2 border-[#2D2D2D] bg-white px-3 py-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-comic-bold text-sm text-[#2D2D2D]">
                            {s.title}
                          </p>
                          <p className="font-comic text-[0.65rem] text-[#4A4A4A]">
                            {s.description.length} chars · {ph} ph ·{" "}
                            {relativeTime(s.createdAt)}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label="Copy"
                          onClick={async () => {
                            const ok = await copyToClipboard(s.description);
                            ok
                              ? notify.success("Copied.", { title: "Copied" })
                              : notify.error("Copy failed.");
                          }}
                          className="card-icon-btn shrink-0 !h-7 !w-7"
                        >
                          <Copy className="!h-3 !w-3" />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete"
                          onClick={() => {
                            dispatch({ type: "DELETE_SNIPPET", id: s.id });
                            notify.info(`"${s.title}" deleted.`);
                          }}
                          className="card-icon-btn shrink-0 !h-7 !w-7 hover:!bg-red-500"
                        >
                          <X className="!h-3 !w-3" />
                        </button>
                      </li>
                    );
                  })}
              </ul>
            )}
          </section>
        </div>

        {/* ── danger zone ──────────────────────────────────── */}
        <section className="card !bg-[#FFE5E5] p-5 md:p-6">
          <h2 className="card-title mb-1 text-xl">
            <AlertTriangle className="mr-2 inline h-5 w-5 text-[#FF6B6B]" />{" "}
            Data controls
          </h2>
          <p className="card-text mb-4">
            Everything is stored in this browser only. Export first if you're
            moving to a new device.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#2D2D2D] bg-white px-3 py-2 font-comic-bold text-xs uppercase tracking-[0.5px] transition-all duration-150 hover:-translate-y-0.5"
              style={{ boxShadow: "3px 3px 0 #2D2D2D" }}
            >
              <Download className="h-4 w-4" /> Export JSON
            </button>

            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#2D2D2D] bg-white px-3 py-2 font-comic-bold text-xs uppercase tracking-[0.5px] transition-all duration-150 hover:-translate-y-0.5"
              style={{ boxShadow: "3px 3px 0 #2D2D2D" }}
            >
              <Upload className="h-4 w-4" /> Import JSON
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="application/json,.json"
              onChange={handleImport}
              className="hidden"
            />

            <button
              type="button"
              onClick={handleClear}
              onBlur={() => setConfirmClear(false)}
              className={[
                "inline-flex items-center gap-2 rounded-xl border-2 border-[#2D2D2D] px-3 py-2 font-comic-bold text-xs uppercase tracking-[0.5px] transition-all duration-150 hover:-translate-y-0.5",
                confirmClear
                  ? "bg-red-500 text-white"
                  : "bg-white text-[#FF6B6B]",
              ].join(" ")}
              style={{ boxShadow: "3px 3px 0 #2D2D2D" }}
            >
              <Trash2 className="h-4 w-4" />
              {confirmClear ? "Click again to confirm" : "Clear all snippets"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

/* ── stat card ──────────────────────────────────────────────── */
const StatCard = ({
  icon,
  label,
  value,
  tint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tint: string;
}) => (
  <div className="card p-4">
    <div
      className={`mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-[#2D2D2D] ${tint}`}
    >
      <span className="h-4 w-4 text-[#2D2D2D]">{icon}</span>
    </div>
    <p className="font-sketch text-2xl leading-none">{value}</p>
    <p className="font-comic-bold text-[0.6rem] uppercase tracking-[0.5px] text-[#4A4A4A]">
      {label}
    </p>
  </div>
);

export default Admin;
