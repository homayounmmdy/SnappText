import { Plus } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../Utility/util";

const Header = () => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { dispatch } = context;

  return (
    <header className="relative bg-yellow-300 text-gray-900 p-6 border-4 border-black overflow-hidden">
      {/* Doodle decorations */}
      <div className="absolute top-2 left-4 w-8 h-8 border-4 border-red-500 rounded-full"></div>
      <div className="absolute bottom-2 right-8 w-6 h-6 border-4 border-blue-500 rotate-45"></div>
      <div className="absolute top-1/2 right-4 w-10 h-10 border-4 border-purple-500 rounded-full opacity-50"></div>
      
      {/* Squiggly lines */}
      <svg className="absolute top-0 left-20 w-32 h-8" viewBox="0 0 100 20">
        <path d="M0 10 Q 25 0, 50 10 T 100 10" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
      
      <div className="max-w-6xl mx-auto flex justify-between items-center relative z-10">
        <div className="transform -rotate-1">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight" 
              style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Snapp Text ✨
          </h1>
          <p className="text-gray-800 hidden md:block mt-1 font-bold">
            Quick snippets, instant copy 📝
          </p>
        </div>
        <button
          onClick={() => dispatch({ type: "OPEN_FORM" })}
          className="relative bg-pink-400 hover:bg-pink-500 px-6 py-3 cursor-pointer border-4 border-black rounded-2xl flex items-center gap-2 transition-all transform hover:scale-105 hover:rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-bold"
        >
          <Plus className="w-5 h-5" strokeWidth={3} />
          Add Snippet
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 border-2 border-black rounded-full"></div>
        </button>
      </div>
    </header>
  );
};

export default Header;
