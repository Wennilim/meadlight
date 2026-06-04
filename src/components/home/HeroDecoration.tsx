import { motion, useScroll, useTransform } from "framer-motion";

export const HeroDecoration = () => {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, (y) => y * 0.25);

  return (
    <>
      <img
        src="/images/imgi_11_flowers.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10vw] lg:right-[-18vw]  top-[60vh] sm:top-[40vh] md:top-[35vh] xl:top-[22vh] z-0 w-[46vw] max-w-[760px] opacity-[0.08] mix-blend-multiply grayscale xl:right-[-4vw]"
      />
      <div className="pointer-events-none fixed bottom-[44px] right-[96px] z-20 hidden h-[120px] w-[120px] xl:block">
        <img
          src="/images/imgi_65_default.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-85 mix-blend-multiply"
        />
        <motion.svg
          viewBox="0 0 131 131"
          className="absolute inset-0 h-full w-full opacity-85 mix-blend-multiply"
          style={{ rotate }}
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
    </>
  );
};
