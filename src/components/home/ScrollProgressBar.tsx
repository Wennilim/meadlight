import { motion, useScroll } from "framer-motion";

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed bottom-0 left-0 top-0 z-50 w-1.5 origin-top bg-[#f8b845] xl:w-2"
      style={{ scaleY: scrollYProgress }}
    />
  );
};
