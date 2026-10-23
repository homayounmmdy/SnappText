import type React from "react";

const PageHeader = ({title, children}: {title : string, children : React.ReactNode}) => {
  return (
    <>
      <h1 className="font-sketch text-5xl md:text-6xl leading-none">
        {title}
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

      {children}
    </>
  );
};

export default PageHeader;
