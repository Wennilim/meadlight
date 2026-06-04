import { motion, MotionValue } from "framer-motion";

type CircularBadgeProps = {
  className?: string;
  rotate?: MotionValue<number>;
  spin?: boolean;
};

export const CircularBadge = ({ className = "", rotate, spin }: CircularBadgeProps) => {
  return (
    <div className={`relative ${className}`}>
      <img
        src="/images/imgi_65_default.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-85 mix-blend-multiply"
      />
      <motion.svg
        viewBox="0 0 131 131"
        className={`absolute inset-0 h-full w-full opacity-85 mix-blend-multiply ${
          spin ? "animate-spin" : ""
        }`}
        style={{
          ...(rotate ? { rotate } : {}),
          ...(spin ? { animationDuration: "10s", animationTimingFunction: "linear" } : {}),
        }}
      >
        <path
          id="textCircle"
          fill="none"
          d="M 65.5, 14 A 51.5,51.5 0 1,1 65.49,14"
        />
        <text className="fill-[#464652] text-[13px] font-medium tracking-[0.15em]">
          <textPath
            href="#textCircle"
            textLength="323.5"
            lengthAdjust="spacing"
          >
            - 100% NATURALE - 100% RAW HONEYS
          </textPath>
        </text>
      </motion.svg>
    </div>
  );
};
