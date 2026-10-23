import type React from "react";

// Timing knobs (seconds)
const STAGGER = 0.045; // gap between each letter
const LETTER_DURATION = 0.35; // time for a single letter to "write in"
const CARET_HOLD = 2; // how long the caret blinks before fading out

const PageHeader = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const letters = Array.from(title);
  const writeTime = letters.length * STAGGER + LETTER_DURATION;

  return (
    <>
      <style>{`
        @keyframes ph-letter-in {
          from {
            opacity: 0;
            transform: translateY(0.12em) rotate(-3deg);
            filter: blur(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
            filter: blur(0);
          }
        }
        @keyframes ph-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes ph-blink {
          0%, 45%   { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes ph-fade-in  { to { opacity: 1; } }
        @keyframes ph-fade-out { to { opacity: 0; } }

        .ph-letter {
          display: inline-block;
          opacity: 0;
          animation: ph-letter-in ${LETTER_DURATION}s cubic-bezier(0.2, 0.8, 0.3, 1) forwards;
        }

        .ph-caret-wrap {
          display: inline-block;
          opacity: 0;
          animation:
            ph-fade-in 0.01s linear forwards,
            ph-fade-out 0.3s ease-out forwards;
        }

        .ph-caret {
          display: inline-block;
          width: 0.06em;
          height: 0.85em;
          margin-left: 0.08em;
          vertical-align: -0.08em;
          background: currentColor;
          animation: ph-blink 0.9s step-end infinite;
        }

        .ph-underline {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: ph-draw 0.8s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .ph-letter,
          .ph-caret,
          .ph-underline {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
          }
          .ph-caret-wrap { display: none; }
        }
      `}</style>

      <h1
        className="font-sketch text-5xl md:text-6xl leading-none"
        aria-label={title}
      >
        <span aria-hidden="true">
          {letters.map((char, i) => (
            <span
              key={i}
              className="ph-letter"
              style={{ animationDelay: `${i * STAGGER}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}

          {/* Blinking caret: appears when the last letter lands, then fades */}
          <span
            className="ph-caret-wrap"
            style={{
              animationDelay: `${writeTime}s, ${writeTime + CARET_HOLD}s`,
            }}
          >
            <span
              className="ph-caret"
              style={{ animationDelay: `${writeTime}s` }}
            />
          </span>
        </span>
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
          pathLength={1}
          className="ph-underline"
          style={{ animationDelay: `${writeTime * 0.6}s` }}
        />
      </svg>

      {children}
    </>
  );
};

export default PageHeader;