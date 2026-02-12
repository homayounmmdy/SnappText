import { useContext } from "react";
import { AppContext } from "../Utility/util";
import AddSnippetBtn from "./AddSnippetBtn.tsx";

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
          <h1 className="text-2xl font-sketch md:text-3xl font-bold relative inline-block">
            <span className="relative z-10">Snapp Text</span>
            {/* Hand-drawn underline */}
            <svg className="absolute -bottom-2 left-0 w-full" height="8" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 4 Q 25 2, 50 4 T 100 4" stroke="#ef4444" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </h1>
          <p className="text-gray-700 font-comic-bold hidden md:block mt-3 font-medium">Quick snippets, instant copy ✨</p>
        </div>
        <AddSnippetBtn handleClick={() => dispatch({ type: "OPEN_FORM" })} />
      </div>
      
      {/* Wavy bottom border */}
      <svg className="absolute bottom-0 left-0 w-full" height="20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
  <path d="M 0 10 Q 250 0, 500 10 T 1000 10 T 1500 10 T 2000 10 L 2000 20 L 0 20 Z" fill="#fef3c7"/>
</svg>
    </header>
  );
};

export default Header;
