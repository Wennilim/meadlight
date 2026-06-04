import { motion, useScroll, useTransform } from "framer-motion";

export const ScrollIndicator = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const pointerEvents = useTransform(scrollY, (v) =>
    v > 100 ? "none" : "auto",
  );

  return (
    <motion.div
      style={{ opacity, pointerEvents }}
      className="pointer-events-auto fixed bottom-10 left-[calc(6.9vw+40px)] z-50 md:bottom-20 md:left-[100px]"
    >
      <button
        type="button"
        className="flex cursor-pointer items-center gap-5 font-merlod-queue text-[18px] font-light leading-none tracking-normal text-[#464652] mix-blend-multiply transition-opacity hover:opacity-70"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        <span className="h-px w-10 bg-[#464652]/30" />
        <span>Scroll to discover</span>
      </button>
    </motion.div>
  );
};
