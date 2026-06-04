import React, { type ReactNode } from "react";
import { cn } from "../../utils/cn";

const AnimatedUnderline = ({ children }: { children: ReactNode }) => {
  return (
    <span className="group relative inline-flex w-fit items-center whitespace-nowrap px-1 py-2 uppercase tracking-[0.02em]">
      <span className="relative z-10">{children}</span>
      <svg
        viewBox="0 0 128 4"
        className="pointer-events-none absolute bottom-1 left-1/2 h-2 w-full -translate-x-1/2 overflow-visible"
        aria-hidden="true"
      >
        <path
          fill="none"
          stroke="#f5a623"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M1 3l126.7-2"
          className="[stroke-dasharray:128] [stroke-dashoffset:128] transition-[stroke-dashoffset] duration-500 ease-out group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]"
        />
      </svg>
    </span>
  );
};

export const AnimatedTextLink = ({
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) => {
  return (
    <a
      {...props}
      className={cn(
        "inline-flex w-fit text-[#464652] outline-none transition-opacity hover:opacity-80 focus-visible:opacity-80",
        className,
      )}
    >
      <AnimatedUnderline>{children}</AnimatedUnderline>
    </a>
  );
};
