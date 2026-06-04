import { motion } from "framer-motion";

export const InfoToggleButton = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.button
      type="button"
      aria-expanded={active}
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative -ml-4 inline-flex min-h-16 w-fit min-w-[150px] cursor-pointer items-center px-4 py-4 uppercase text-[#464652] outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
    >
      <div className="relative inline-flex items-center gap-4">
        <span className="relative z-10 text-xl font-semibold leading-none">
          {active ? "x" : "+"}
        </span>
        <span className="relative z-10 text-xl font-normal leading-none">
          Info
        </span>
        <svg
          viewBox="0 0 122 126"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[100px] w-[120px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
          aria-hidden="true"
        >
          <motion.path
            fill="none"
            stroke="#f8b845"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            d="M66 22.8c-9.4-.1-13.8-1.2-21.3.1-5 .8-12.5 1.9-19.3 7.9C10.4 44 .3 76.5 14.3 94.9c14.8 19.5 32.8 31.6 54.1 29.5 59.8-6 70.9-92 18.6-117.2-15.6-7.6-29.7-6-46.8-.8C25.4 10.8 3.7 24.6 1 40.7"
            variants={{
              rest: { pathLength: 0, opacity: 0 },
              hover: { pathLength: 1, opacity: 0.8 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </svg>
      </div>
    </motion.button>
  );
};
