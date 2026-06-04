import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { cn } from "../../utils/cn";
import { Number } from "./Number";

type RecipeImage = {
  src: string;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  width: number;
  parallax?: number;
  hiddenMobile?: boolean;
};

type RecipeSubmenu = {
  heading: string;
  method: string;
  glass: string;
  garnish?: string;
};

export type AccordionItem = {
  id: number;
  title: string;
  submenu: RecipeSubmenu;
  images: RecipeImage[];
};

const defaultImages: RecipeImage[] = [
  {
    src: "/images/imgi_30_ghiaccio_00.png",
    top: 35,
    left: 2,
    width: 7,
    parallax: 0.1,
  },
  {
    src: "/images/imgi_31_frenchie_01.png",
    bottom: 25,
    right: -3,
    width: 13,
    parallax: 0.1,
    hiddenMobile: true,
  },
  {
    src: "/images/imgi_32_mexicano_02.png",
    bottom: 8,
    left: 10,
    width: 10,
    parallax: 0.1,
  },
  {
    src: "/images/imgi_33_red_04.png",
    top: 0,
    left: 35,
    width: 9,
    parallax: 0.1,
  },
  {
    src: "/images/imgi_34_frenchie_00.png",
    top: 40,
    right: 25,
    width: 13,
    parallax: 0.1,
  },
  {
    src: "/images/imgi_35_ghiaccio_01.png",
    top: 15,
    right: -2,
    width: 7,
    parallax: 0.1,
  },
  {
    src: "/images/imgi_26_rosmarino_01.png",
    bottom: 5,
    right: 8,
    width: 8,
    parallax: 0.1,
  },
];

const drawCirclePath =
  "M66 22.8c-9.4-.1-13.8-1.2-21.3.1-5 .8-12.5 1.9-19.3 7.9C10.4 44 .3 76.5 14.3 94.9c14.8 19.5 32.8 31.6 54.1 29.5 59.8-6 70.9-92 18.6-117.2-15.6-7.6-29.7-6-46.8-.8C25.4 10.8 3.7 24.6 1 40.7";

const underlinePath =
  "M3.1 4.5c42.5-5.4 86.3 6.1 128.9.9";

const getImageStyle = (
  image: RecipeImage,
  imageMultiplier: number,
): CSSProperties => ({
  top: image.top === undefined ? undefined : `${image.top}%`,
  bottom: image.bottom === undefined ? undefined : `${image.bottom}%`,
  left: image.left === undefined ? undefined : `${image.left}vw`,
  right: image.right === undefined ? undefined : `${image.right}vw`,
  width: `${image.width * imageMultiplier}vw`,
});

const RecipeImages = ({
  images,
  imageKey,
  imageMultiplier,
}: {
  images: RecipeImage[];
  imageKey: string | number;
  imageMultiplier: number;
}) => (
  <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-full min-h-screen overflow-hidden">
    <AnimatePresence mode="wait">
      <motion.div
        key={imageKey}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        {images.map((image) => (
          <motion.figure
            key={`${imageKey}-${image.src}-${image.top ?? image.bottom ?? 0}`}
            className={cn(
              "absolute mix-blend-multiply",
              image.hiddenMobile && "hidden md:block",
            )}
            style={getImageStyle(image, imageMultiplier)}
            initial={{ opacity: 0, y: 70 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.2,
                ease: [0.19, 1, 0.22, 1],
              },
            }}
            exit={{
              opacity: 0,
              y: -70,
              transition: { duration: 0.45, ease: "easeIn" },
            }}
          >
            <span className="block opacity-35 md:opacity-100">
              <img
                src={image.src}
                alt=""
                aria-hidden="true"
                className="block h-auto max-h-full max-w-full"
              />
            </span>
          </motion.figure>
        ))}
      </motion.div>
    </AnimatePresence>
  </div>
);

const ToggleMark = ({ active }: { active: boolean }) => (
  <span className="relative ml-3 inline-flex min-h-12 min-w-12 items-center justify-center px-4 text-[40px] font-normal leading-none text-[#464652]/70 md:text-[24px] lg:text-[34px]">
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 hidden w-full -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 xl:block"
      viewBox="0 0 122 126"
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke="#f8b845"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        d={drawCirclePath}
      />
    </svg>
    <motion.span
      className="inline-block"
      animate={{ rotate: active ? -135 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      +
    </motion.span>
  </span>
);

const TitleUnderline = ({ active }: { active: boolean }) => (
  <AnimatePresence>
    {active && (
      <motion.svg
        className="pointer-events-none absolute -bottom-5 left-0 w-full origin-left"
        viewBox="0 0 135 10"
        preserveAspectRatio="none"
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        exit={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <path
          fill="none"
          stroke="#f8b845"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
          vectorEffect="non-scaling-stroke"
          d={underlinePath}
        />
      </motion.svg>
    )}
  </AnimatePresence>
);

const SubmenuRow = ({
  heading,
  children,
}: {
  heading: string;
  children: string;
}) => (
  <li className="relative md:grid md:grid-cols-[65px_auto] 2xl:grid-cols-[100px_auto]">
    <p className="mb-2 font-normal md:mb-0">{heading}</p>
    <p className="mb-7 max-w-[300px] font-thin leading-[1.45]">{children}</p>
  </li>
);

export const Accordion = ({
  data,
  number,
  subtitle,
}: {
  data: AccordionItem[];
  number: string;
  subtitle: string;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [imageMultiplier, setImageMultiplier] = useState(1);

  useEffect(() => {
    const updateImageMultiplier = () => {
      const width = window.innerWidth;
      setImageMultiplier(width < 400 ? 3 : width < 800 ? 2 : 1);
    };

    updateImageMultiplier();
    window.addEventListener("resize", updateImageMultiplier);

    return () => window.removeEventListener("resize", updateImageMultiplier);
  }, []);

  const activeImages =
    activeIndex === null ? defaultImages : data[activeIndex].images;

  return (
    <div className="relative grid w-full grid-cols-[repeat(29,minmax(0,1fr))] py-60 text-[#464652] mix-blend-multiply md:grid-cols-[repeat(16,minmax(0,1fr))] md:py-[150px] 2xl:py-[175px]">
      <RecipeImages
        images={activeImages}
        imageKey={activeIndex ?? "idle"}
        imageMultiplier={imageMultiplier}
      />

      <div className="relative z-10 col-start-4 col-end-10 row-start-1 md:col-end-6 lg:col-end-5">
        <Number num={number} />
      </div>

      <div className="relative z-10 col-start-4 col-end-[28] row-start-2 mt-10 md:col-end-12">
        <p className="mb-9 text-[18px] font-normal uppercase leading-none md:text-[20px]">
          {subtitle}
        </p>

        <ul className="relative w-full">
          {data.map((item, index) => {
            const isActive = activeIndex === index;
            const panelId = `recipe-panel-${item.id}`;
            const buttonId = `recipe-button-${item.id}`;

            return (
              <li key={item.id} className="relative w-full">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  className="group relative flex w-1/2 md:w-full cursor-pointer items-baseline justify-between pb-[60px] text-left"
                >
                  <span className="relative inline-block">
                    <span className="relative inline-block text-[32px] font-semibold leading-[0.98] text-[#464652] sm:text-[40px] md:text-[48px] lg:text-[54px] xl:text-[58px] 2xl:text-[74px]">
                      {item.title}
                    </span>
                    <TitleUnderline active={isActive} />
                  </span>

                  <ToggleMark active={isActive} />

                  <span
                    className="absolute bottom-[30px] left-0 h-px w-full bg-[#3e3a34]/15"
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.ul
                      id={panelId}
                      aria-labelledby={buttonId}
                      className="overflow-hidden text-[17px] md:text-[18px]"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.7, ease: "easeOut" },
                          opacity: { duration: 0.35, delay: 0.12 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.45, ease: "easeInOut" },
                          opacity: { duration: 0.2 },
                        },
                      }}
                    >
                      <motion.li
                        className="mb-7 max-w-[520px] font-normal leading-[1.45]"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 18 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      >
                        {item.submenu.heading}
                      </motion.li>

                      <SubmenuRow heading="Method.">
                        {item.submenu.method}
                      </SubmenuRow>

                      <SubmenuRow heading="Glass.">
                        {item.submenu.glass}
                      </SubmenuRow>

                      {item.submenu.garnish && (
                        <SubmenuRow heading="Garnish.">
                          {item.submenu.garnish}
                        </SubmenuRow>
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
