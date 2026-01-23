import { Plus } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../Utility/util";
import Button from "./Button.tsx";

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
            <pattern id="doodles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor"/>
              <circle cx="80" cy="60" r="3" fill="currentColor"/>
              <path d="M 40 40 Q 45 35, 50 40" stroke="currentColor" fill="none" strokeWidth="2"/>
              <path d="M 70 20 L 75 25 L 70 30" stroke="currentColor" fill="none" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#doodles)"/>
        </svg>
      </div>
      
      <div className="max-w-6xl mx-auto flex justify-between items-center relative z-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold relative inline-block">
            <span className="relative z-10">Snapp Text</span>
            {/* Hand-drawn underline */}
            <svg className="absolute -bottom-2 left-0 w-full" height="8" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 4 Q 25 2, 50 4 T 100 4" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </h1>
          <p className="text-gray-700 hidden md:block mt-3 font-medium">Quick snippets, instant copy ✨</p>
        </div>
        <Button
          onClick={() => dispatch({ type: "OPEN_FORM" })}
          className="bg-white hover:bg-red-50 text-gray-900 px-4 py-2 cursor-pointer rounded-2xl flex items-center gap-2 transition-all hover:scale-105 hover:rotate-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-3 border-black relative group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
          Add Snippet
          {/* Doodle decoration */}
          <svg className="absolute -top-2 -right-2 w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" fill="#fbbf24" stroke="#000" strokeWidth="2"/>
            <path d="M 8 12 L 12 8 L 16 12" stroke="#000" strokeWidth="2" fill="none"/>
          </svg>
        </Button>
      </div>
      
      {/* Wavy bottom border */}
      <svg className="absolute bottom-0 left-0 w-full" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
  <path d="M 0 10 Q 250 0, 500 10 T 1000 10 T 1500 10 T 2000 10 L 2000 20 L 0 20 Z" fill="#fef3c7"/>
</svg>
    </header>
  );
};

export default Header;
