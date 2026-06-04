const data = [
  {
    id: 1,
    title: "You drink it in low tumblers with your friends",
    highlight: "low tumblers",
    content: "thanks to its light/mild carbonation.",
  },
  {
    id: 2,
    title: "We blend six honeys together",
    highlight: "six honeys",
    content:
      "In different quantities, according to a principle that develops unique tastes and aromas, as well as light alcohol contents.",
  },
  {
    id: 3,
    title: "We only use raw honeys",
    highlight: "raw honeys",
    content:
      "This way, the properties and color of each one instantly recalls our drink.",
  },
];

import { useRef } from "react";
import { Carousel } from "./shared/Carousel";
import { motion, useScroll, useTransform } from "framer-motion";

export const Features = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [300, -300]);

  return (
    <section
      ref={containerRef}
      id="second-section"
      className="relative min-h-screen w-full"
    >
      <img
        src="/images/hand_00.png"
        alt="Hand background"
        className="absolute right-0 sm:left-1/2 top-1/2 w-[30vw] lg:w-[25vw] -translate-x-1/20 -translate-y-1/2 z-20"
      />
      <Carousel
        data={data}
        number="01"
        subtitle="It is refreshing, sweet and natural."
      />
      <motion.img
        src="/images/imgi_6_bee_01.png"
        alt="bee"
        className="absolute right-10 top-[20%] max-w-[100px]"
        style={{ y }}
      />
    </section>
  );
};
