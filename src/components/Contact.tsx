import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { contactData, socials } from "../data/contact";
import { AnimatedTextLink } from "./contact/AnimatedTextLink";
import { ContactItem } from "./contact/ContactItem";
import { FindUsPanel } from "./contact/FindUsPanel";
import { LegalInfo } from "./contact/LegalInfo";
import { SocialIconLink } from "./contact/SocialIconLink";
import { Carousel } from "./shared/Carousel";
import { InfoToggleButton } from "./contact/InfoToggleButton";

export const Contact = () => {
  const [showPlaces, setShowPlaces] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 0.5, 1], [-200, 0, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -100, 0]);

  return (
    <section
      id="contact-section"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden pb-8 pt-1 sm:pb-10 lg:min-h-[110vh] lg:pb-12"
    >
      <motion.img
        src="/images/imgi_36_bee_02.png"
        alt="bee"
        className="pointer-events-none absolute left-[10%] top-20 lg:top-[15%] z-10 max-w-[60px] lg:max-w-[100px]"
        style={{ y }}
      />

      <Carousel {...{ data: contactData, subtitle: "Nice to meet you" }} />

      <motion.img
        src="/images/imgi_37_hand_01.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-28%] top-[6%] z-0 hidden max-w-[58%] opacity-70 mix-blend-multiply sm:block md:right-[-16%] md:max-w-[45%] lg:right-[-9%] lg:max-w-[40%]"
        style={{ x }}
      />

      <footer className="relative z-10 mx-auto mt-20 w-full max-w-[1720px] px-6 sm:px-10 md:mt-28 lg:px-[6vw] xl:pr-[190px] 2xl:pr-[220px]">
        <div className="grid gap-8 border-y border-[#464652]/10 py-8 lg:grid-cols-[170px_minmax(0,1fr)] lg:items-center lg:gap-12 xl:grid-cols-[190px_minmax(0,1fr)]">
          <InfoToggleButton
            active={showInfo}
            onClick={() =>
              setShowInfo((isOpen) => {
                const nextOpen = !isOpen;
                if (nextOpen) {
                  setShowPlaces(false);
                }
                return nextOpen;
              })
            }
          />

          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {showInfo ? (
                <LegalInfo />
              ) : (
                <motion.div
                  key="contact-links"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="grid min-w-0 gap-7"
                >
                  <div className="grid min-w-0 gap-7 sm:grid-cols-[minmax(230px,1fr)_minmax(180px,0.8fr)] sm:items-end lg:grid-cols-[minmax(240px,1fr)_minmax(190px,0.8fr)_auto] lg:gap-10 xl:gap-14">
                    <ContactItem label="Email">
                      <AnimatedTextLink href="mailto:info@meadlight.com">
                        info@meadlight.com
                      </AnimatedTextLink>
                    </ContactItem>

                    <ContactItem label="Phone">
                      <AnimatedTextLink href="tel:+390154193206">
                        +39 015 4193206
                      </AnimatedTextLink>
                    </ContactItem>

                    <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1 lg:justify-start">
                      {socials.map((social) => (
                        <SocialIconLink
                          key={social.label}
                          href={social.href}
                          label={social.label}
                        >
                          {social.icon}
                        </SocialIconLink>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div id="where-to-buy">
          <AnimatePresence>{showPlaces && <FindUsPanel />}</AnimatePresence>
        </div>
        <footer className="mt-12 flex w-full flex-col items-center justify-between gap-4 text-center text-black lg:flex-row">
          <p className="text-xs leading-6 text-[#464652]/40 lg:text-left">
            This is a non-commercial clone built for educational purposes only.
            All rights belong to the original creators. No copyright
            infringement intended.
          </p>
          <p className="text-xs text-[#464652]/60 lg:text-right lg:mr-12">
            Built by{" "}
            <a
              className="text-[#464652]/80 underline-offset-4 transition duration-200 hover:text-[#eeb71c] hover:underline"
              href="https://www.linkedin.com/in/lim-w-857166229/"
              target="_blank"
              rel="noreferrer"
            >
              Wen Ni Lim
            </a>
          </p>
        </footer>
      </footer>
    </section>
  );
};
