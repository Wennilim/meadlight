import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { HoneyUnderline } from "./HoneyUnderline";
import { Number } from "./Number";

interface DataType {
  id: number;
  title: string;
  highlight?: string;
  content: string;
  image?: string;
}

export const Carousel = ({
  data,
  number,
  subtitle,
  align = "left",
}: {
  data: DataType[];
  number?: string;
  subtitle: string;
  align?: "left" | "right";
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <>
      {align === "right" && data[currentSlide].image && (
        <img
          src={data[currentSlide].image}
          alt={data[currentSlide].title}
          className="absolute left-0 top-0 hidden md:block md:w-[40vw]"
        />
      )}
      <div
        className={cn(
          "relative flex flex-col gap-3 mx-8 mt-40",
          align === "right" ? "items-end lg:mr-55" : "items-start lg:ml-55",
        )}
      >
        {number && <Number num={number} />}

        <div
          className={cn(
            "flex flex-col gap-4 max-w-[250px] md:max-w-[380px]",
            align === "right"
              ? "items-end text-right"
              : "items-start text-left",
          )}
        >
          <p className="text-[18px] md:text-[20px] text-[#464652] uppercase font-normal">
            {subtitle}
          </p>

          <div
            className={cn(
              "grid text-[#464652]",
              align === "right" ? "text-right" : "text-start",
            )}
          >
            {data.map((item, index) => {
              const highlight = item.highlight ?? item.title;
              const [before = "", after = ""] = item.title.split(highlight);

              return (
                <div
                  key={item.id}
                  className={cn(
                    "col-start-1 row-start-1 transition-opacity duration-500",
                    currentSlide === index
                      ? "opacity-100 z-10"
                      : "opacity-0 pointer-events-none z-0",
                  )}
                >
                  <h1 className="text-[36px] sm:text-[44px] md:text-[68px] leading-10 sm:leading-12 md:leading-16 font-semibold">
                    {before}
                    <HoneyUnderline active={currentSlide === index}>
                      {highlight}
                    </HoneyUnderline>
                    {after}
                  </h1>

                  <p
                    className="text-lg md:text-xl font-thin mt-4"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              );
            })}
          </div>

          {data.length > 1 && (
            <div className="flex mt-12 gap-8 sm:gap-12 md:gap-18">
              {data.map((item, index) => (
                <div
                  key={item.id}
                  className="relative flex items-center justify-center"
                >
                  {currentSlide === index && (
                    <svg
                      viewBox="0 0 122 126"
                      className="absolute w-[300%] max-w-none pointer-events-none"
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
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, ease: "easeOut" }}
                      />
                    </svg>
                  )}
                  <button
                    onClick={() => setCurrentSlide(index)}
                    className={cn(
                      "size-2.5 sm:size-3 rounded-full relative z-10 cursor-pointer",
                      currentSlide === index
                        ? "bg-[#464652]"
                        : "bg-transparent border border-[#464652]",
                    )}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
