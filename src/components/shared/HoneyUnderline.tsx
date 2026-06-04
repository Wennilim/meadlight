import { motion } from "framer-motion";

export const HoneyUnderline = ({
  active,
  children,
}: {
  active: boolean;
  children: string;
}) => (
  <span className="relative inline-block whitespace-nowrap pb-[0.08em]">
    <span className="relative z-10">{children}</span>
    <svg
      className="pointer-events-none absolute -left-[0.05em] -bottom-[0.03em] z-0 h-[0.16em] w-[110%] overflow-visible"
      viewBox="0 0 135 10"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.path
        fill="none"
        stroke="#f8b845"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5.5"
        d="M3.1 4.5c42.5-5.4 86.3 6.1 128.9.9"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.2,
        }}
      />
    </svg>
  </span>
);
