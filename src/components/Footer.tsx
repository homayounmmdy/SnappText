import { Github, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-cyan-300 text-gray-900 p-6 border-t-4 border-black overflow-hidden">
      {/* Doodle decorations */}
      <div className="absolute bottom-2 left-8 w-12 h-12 border-4 border-yellow-500"></div>
      <div className="absolute top-3 right-12 w-8 h-8 border-4 border-pink-500 rounded-full"></div>
      <div className="absolute bottom-4 right-4 w-10 h-2 bg-red-500 border-2 border-black transform rotate-12"></div>

      {/* Stars */}
      <div className="absolute top-2 left-1/4 text-2xl">⭐</div>
      <div className="absolute bottom-2 right-1/3 text-xl">✨</div>

      {/* Zigzag line */}
      <svg
        className="absolute bottom-0 left-1/2 w-48 h-8 transform -translate-x-1/2"
        viewBox="0 0 100 20"
      >
        <path
          d="M0 10 L 10 5 L 20 10 L 30 5 L 40 10 L 50 5 L 60 10 L 70 5 L 80 10 L 90 5 L 100 10"
          stroke="#8b5cf6"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <p
          className="flex justify-center items-center gap-2.5 font-bold text-lg transform rotate-1"
          style={{ fontFamily: "Comic Sans MS, cursive" }}
        >
          Created by
          <Heart
            className="w-6 h-6 fill-red-500 text-red-500 animate-pulse"
            strokeWidth={3}
          />
          See more in my
          <a
            href="https://github.com/homayounmmdy"
            title="github"
            className="inline-flex items-center bg-white border-3 border-black rounded-full p-2 hover:bg-gray-900 hover:text-white transition-all transform hover:scale-110 hover:-rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <Github className="w-5 h-5" strokeWidth={3} />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
