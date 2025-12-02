import { useContext } from "react";
import { AppContext } from "../Utility/util";
import { Search } from "lucide-react";

const SearchBar = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { dispatch, state } = context;
  
  return (
    <div className="bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 relative rounded-3xl shadow-lg border-4 border-black mb-6 overflow-hidden">

      <input
        type="text"
        placeholder="Search snippets..."
        className="w-full p-4 border-0 rounded-3xl !pr-14 focus:outline-none focus:ring-4 focus:ring-purple-400 bg-white font-bold text-gray-800 placeholder-gray-500"
        value={state.searchTerm}
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH_TERM", term: e.target.value })
        }
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
