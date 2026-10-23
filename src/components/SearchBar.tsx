import { useContext, useEffect } from "react";
import { Search } from "lucide-react";
import { AppContext } from "../Utility/util";

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  paramName?: string;
  placeholder?: string;
  id?: string;
};

const SearchBar = ({
  value: controlledValue,
  onChange: controlledOnChange,
  paramName = "q",
  placeholder = "Search snippets...",
  id = "search-snippets",
}: SearchBarProps = {}) => {
  const context = useContext(AppContext);
  const isControlled = controlledValue !== undefined;

  const value = isControlled ? controlledValue : context?.state.searchTerm ?? "";

  const setValue = (term: string) => {
    if (isControlled) controlledOnChange?.(term);
    else context?.dispatch({ type: "SET_SEARCH_TERM", term });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlQ = new URLSearchParams(window.location.search).get(paramName);
    if (urlQ !== null && urlQ !== value) setValue(urlQ);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramName]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(paramName, value);
    else params.delete(paramName);

    const search = params.toString();
    const newUrl = search
      ? `${window.location.pathname}?${search}`
      : window.location.pathname;

    window.history.replaceState({}, "", newUrl);
  }, [value, paramName]);

  if (!isControlled && !context) return null;

  return (
    <div
      id={id}
      className="bg-gradient-to-r font-comic-bold from-yellow-200 via-pink-200 to-blue-200 relative rounded-3xl shadow-lg border-4 border-black mb-6 overflow-hidden"
    >
      <input
        type="text"
        placeholder={placeholder}
        className="w-full p-4 border-0 rounded-3xl !pr-14 focus:outline-none focus:ring-4 focus:ring-purple-400 bg-white font-bold text-gray-800 placeholder-gray-500"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label={placeholder}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-br from-pink-400 to-purple-500 p-2 rounded-full border-3 border-black shadow-md">
        <Search className="h-5 w-5 text-white" />
      </div>

      {/* Decorative squiggle */}
      <div className="absolute bottom-0 right-20 w-16 h-1 bg-black rounded-full opacity-20"></div>
    </div>
  );
};

export default SearchBar;