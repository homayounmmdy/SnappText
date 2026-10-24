import { Check, Plus, X } from "lucide-react";
import { useContext, useMemo, useState } from "react";
import { notify } from "../components/Notify";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import {
  CATEGORIES,
  snippetStore,
  type StoreCategory,
  type StoreSnippet,
} from "../data/snippetStore";
import { AppContext, extractPlaceholders } from "../Utility/util";

const STORE_QUERY_PARAM = "store-q";

const SnippetStore = () => {
  const context = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<StoreCategory | "all">("all");

  if (!context) return null;
  const { state, dispatch } = context;

  const isAdded = (snippet: StoreSnippet) =>
    state.snippets.some((s) => s.description === snippet.description);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return snippetStore.filter((s) => {
      if (category !== "all" && s.category !== category) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, category]);


  const handleAdd = (snippet: StoreSnippet) => {
    if (isAdded(snippet)) {
      notify.info("This snippet is already in your library.", {
        title: "Already added",
      });
      return;
    }
    dispatch({
      type: "ADD_SNIPPET",
      snippet: {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        title: snippet.title,
        description: snippet.description,
        createdAt: new Date(),
      },
    });
    notify.success(`"${snippet.title}" added to your library.`, {
      title: "Saved!",
    });
  };

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    // drop the query param without a reload
    const params = new URLSearchParams(window.location.search);
    params.delete(STORE_QUERY_PARAM);
    const search = params.toString();
    window.history.replaceState(
      {},
      "",
      search
        ? `${window.location.pathname}?${search}`
        : window.location.pathname,
    );
  };

  const hasFilters = query.trim().length > 0 || category !== "all";

  return (
    <div className="min-h-screen bg-[#FFF8E7] text-[#2D2D2D] font-comic">
      <div className="max-w-6xl mx-auto p-6">
        <PageHeader title="Snippet Store">
          <p className="my-4 max-w-xl text-sm md:text-base leading-relaxed text-[#4A4A4A]">
            Hand-picked snippets for the things you write every day. Add one to
            your library with a single click — fill in the variables later.
          </p>
        </PageHeader>

        {/* ── SearchBar reused here, scoped to ?store-q= ── */}
        <SearchBar
          id="search-store"
          value={query}
          onChange={setQuery}
          paramName={STORE_QUERY_PARAM}
          placeholder="Search the store..."
        />

        {/* category pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                aria-pressed={active}
                className={[
                  "badge font-comic-bold text-[0.65rem] uppercase tracking-[0.5px] transition-all duration-150",
                  cat.bg,
                  active
                    ? "-translate-y-0.5 shadow-[3px_3px_0_#2D2D2D]"
                    : "hover:-translate-y-0.5 hover:shadow-[2px_2px_0_#2D2D2D]",
                ].join(" ")}
              >
                {cat.label}
              </button>
            );
          })}

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="badge bg-white font-comic-bold text-[0.65rem] uppercase tracking-[0.5px] text-[#FF6B6B] transition-colors hover:bg-[#FFE5E5]"
            >
              Clear
            </button>
          )}
        </div>

        {/* result count */}
        <p className="mb-4 font-comic text-xs text-[#4A4A4A]">
          Showing{" "}
          <strong className="font-comic-bold text-[#2D2D2D]">
            {filtered.length}
          </strong>{" "}
          {filtered.length === 1 ? "snippet" : "snippets"}
        </p>

        {/* grid */}
        {filtered.length === 0 ? (
          <div className="card mx-auto max-w-md p-8 text-center">
            <p className="card-title mb-2 text-xl">Nothing here yet</p>
            <p className="card-text mb-5">
              No snippets match your search. Try a different keyword or clear
              the filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#2D2D2D] bg-white px-3 py-2 font-comic-bold text-xs uppercase tracking-[0.5px] transition-all duration-150 hover:-translate-y-0.5"
              style={{ boxShadow: "3px 3px 0 #2D2D2D" }}
            >
              <X className="h-4 w-4" />
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((snippet) => (
              <StoreCard
                key={snippet.id}
                snippet={snippet}
                added={isAdded(snippet)}
                onAdd={() => handleAdd(snippet)}
              />
            ))}
          </div>
        )}

        <p className="mt-10 text-center font-comic text-xs text-[#4A4A4A]/70">
          Have an idea for the store?{" "}
          <a
            href="https://github.com/homayunmmdy/SnappText/issues"
            target="_blank"
            rel="noreferrer"
            className="font-comic-bold text-[#FF6B6B] underline decoration-2 underline-offset-2"
          >
            Open an issue
          </a>
          .
        </p>
      </div>
    </div>
  );
};

/* card — unchanged from before */
const StoreCard = ({
  snippet,
  added,
  onAdd,
}: {
  snippet: StoreSnippet;
  added: boolean;
  onAdd: () => void;
}) => {
  const placeholders = extractPlaceholders(snippet.description);
  const cat = CATEGORIES.find((c) => c.id === snippet.category)!;

  return (
    <article className="card flex flex-col p-5">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h2 className="card-title mb-0 min-w-0 text-lg leading-tight">
          {snippet.title}
        </h2>
        <span
          className={`badge ${cat.bg} shrink-0 !px-2 !py-0.5 font-comic-bold text-[0.55rem] uppercase tracking-[0.5px]`}
        >
          {cat.label}
        </span>
      </div>

      <p className="card-text mb-3 whitespace-pre-line line-clamp-4">
        {snippet.description}
      </p>

      {placeholders.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {placeholders.slice(0, 4).map((p) => (
            <span
              key={p}
              className="badge badge-warning !px-2 !py-0 font-comic-bold text-[0.55rem] uppercase tracking-[0.5px]"
            >
              {`{{${p}}}`}
            </span>
          ))}
          {placeholders.length > 4 && (
            <span className="badge bg-white !px-2 !py-0 font-comic-bold text-[0.55rem] uppercase tracking-[0.5px] text-[#4A4A4A]">
              +{placeholders.length - 4}
            </span>
          )}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
        <span className="truncate font-comic text-[0.7rem] text-[#4A4A4A]/70">
          {snippet.tags.join(" · ")}
        </span>

        <button
          type="button"
          onClick={onAdd}
          disabled={added}
          aria-label={added ? "Already added" : `Add ${snippet.title}`}
          className={[
            "inline-flex shrink-0 items-center gap-1.5 rounded-xl border-2 border-[#2D2D2D] px-3 py-1.5 font-comic-bold text-[0.65rem] uppercase tracking-[0.5px] transition-all duration-150",
            added
              ? "cursor-default bg-emerald-200 text-[#2D2D2D]"
              : "bg-blue-500 text-white hover:-translate-y-0.5 hover:bg-blue-600 active:translate-x-0 active:translate-y-0",
          ].join(" ")}
          style={{
            boxShadow: added ? "2px 2px 0 #2D2D2D" : "3px 3px 0 #2D2D2D",
          }}
        >
          {added ? (
            <>
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
              Added
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" strokeWidth={3} />
              Add
            </>
          )}
        </button>
      </div>
    </article>
  );
};

export default SnippetStore;
