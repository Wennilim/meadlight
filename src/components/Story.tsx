import { Carousel } from "./shared/Carousel";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const data = [
  {
    id: 1,
    title: "In the beginning, it was honey",
    highlight: "was honey",
    content: `<p>
      Our project dates back to 2014, after having tried mead in a Prague pub. That’s how we became passionate about the honey fermentation process. We came back to Italy, and nearly two months afterwards, we tried over and over different production methods and techniques.
    </p>
    <br/>
    <p>
      Not content with the results, we changed method and experimented a new style which allowed us to create an innovative and natural drink. After several attempts, in 2018 we succeeded in creating Principio, our first drink. Principio granted Meadlight to pursue continuous experimentations in the honey fermentation field, supporting a genuine future and being under the banner of innovation and sustainability.
    </p>
    `,
  },
];

export const Story = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [300, -300]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [-200, 0, 0]);
  return (
    <section
      id="short-story"
      ref={containerRef}
      className="relative min-h-screen w-full"
    >
      <motion.img
        src="/images/story_00.png"
        alt="story honey stick"
        className="absolute top-[-10%] left-0 z-0 max-w-[25%]"
        style={{ x }}
      />
      <motion.img
        src="/images/imgi_36_bee_02.png"
        alt="bee"
        className="absolute right-1/2 top-[-10%] max-w-[50px] lg:max-w-[100px]"
        style={{ y }}
      />
      <motion.img
        src="/images/imgi_14_story_01.png"
        alt="story honey pot"
        className="absolute bottom-0 right-[-5%] z-0 max-w-[20%]"
        style={{ y }}
      />

      <Carousel {...{ data, subtitle: "A short story", number: "03" }} />
    </section>
  );
};
