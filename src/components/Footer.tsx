import { Github, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-purple-300 text-gray-900 p-6 relative overflow-hidden">
      {/* Doodle background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="footer-doodles"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="2" fill="currentColor" />
              <circle cx="60" cy="50" r="3" fill="currentColor" />
              <path
                d="M 30 30 L 35 35 L 30 40"
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-doodles)" />
        </svg>
      </div>

      {/* Wavy top border */}

      <div className="absolute top-0 left-0 right-0">
        <svg
          width="100%"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 10 Q 250 20, 500 10 T 1000 10 T 1500 10 T 2000 10 L 2000 0 L 0 0 Z"
            fill="#e9d5ff"
          />
        </svg>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <p className="flex justify-center items-center gap-2.5 font-bold text-lg">
          Created by
          <Heart className="w-5 h-5 fill-red-500 text-red-500 animate-pulse" />
          See more in my
          <a
            href="https://github.com/homayunmmdy"
            title="github"
            className="inline-flex items-center justify-center bg-white hover:bg-yellow-50 p-2 rounded-full transition-all hover:scale-110 hover:rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black"
          >
            <Github className="w-5 h-5" />
          </a>
        </p>

        {/* Decorative doodles */}
        <svg
          className="absolute -bottom-4 left-10 w-16 h-16 opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 8 8 Q 12 4, 16 8 T 24 8"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="8" cy="16" r="3" fill="currentColor" />
        </svg>

        <svg
          className="absolute -top-4 right-10 w-16 h-16 opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 4 12 L 12 4 L 20 12 L 12 20 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
