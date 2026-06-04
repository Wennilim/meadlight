import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { usePreloadAssets } from "../../hooks/usePreloadAssets";

const enterEase = [0.16, 1, 0.3, 1] as const;

const titleLetterVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    rotate: -2,
    scale: 0.96,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      delay: 0.58 + index * 0.065,
      duration: 0.92,
      ease: enterEase,
    },
  }),
};

const titlePaths = [
  "M6.2,49.5C4.1,39,2,28.6,0,18.1c5.4,3.8,10.7,7.6,15.9,11.5c3.1-5.7,6.2-11.4,9.5-17c2.5,10.4,5,20.7,7.5,31.1c-2.1,0.5-4.1,1-6.1,1.5c-1.3-5-2.5-10.1-3.8-15.1c-1.7,3.1-3.3,6.2-4.9,9.3c-2.8-2.2-5.7-4.3-8.5-6.4c0.9,5.1,1.9,10.2,2.8,15.3C10.2,48.7,8.2,49.1,6.2,49.5z",
  "M36,18c-0.3,0.1-0.6,0.2-0.9,0.2c-0.4-2.2-0.9-4.4-1.3-6.6c9.3-1.9,18.6-3.5,28-5c0.4,2.2,0.7,4.4,1.1,6.6c-6.6,1-13.3,2.2-19.9,3.4c0.3,1.9,0.7,3.9,1,5.8c4.1-0.7,8.2-1.3,12.3-2c0.3,2.2,0.7,4.4,1,6.6c-4.1,0.6-8.1,1.2-12.2,1.9c0.3,1.8,0.6,3.6,0.9,5.4c6.5-1,12.9-1.8,19.4-2.6c0.2,2.2,0.5,4.5,0.7,6.7c-8.9,1.1-17.9,2.4-26.8,3.8c-0.4-2.2-0.7-4.4-1.1-6.6c0.3-0.1,0.6-0.1,0.9-0.2C38.2,29.9,37.1,24,36,18z",
  "M72.6,35c0.5-1.8,1-3.5,1.4-5.3c-0.2-1.9-0.5-3.8-0.7-5.7c0.8-0.1,1.7-0.2,2.5-0.3c1.8-6.3,3.8-12.7,5.8-19c1.8-0.2,3.5-0.4,5.3-0.5c3.1,5.8,6.2,11.6,9.1,17.5c0.8-0.1,1.6-0.1,2.3-0.2c0.2,1.9,0.3,3.8,0.5,5.7c0.9,1.7,1.7,3.4,2.6,5.2c-1.8,0.9-3.7,1.8-5.5,2.7c-1.2-2.3-2.4-4.6-3.6-6.9c-3.9,0.4-7.8,0.8-11.7,1.2c-0.8,2.5-1.5,5.1-2.3,7.6C76.5,36.2,74.6,35.6,72.6,35zM85.2,14.5c-0.9,2.8-1.8,5.6-2.6,8.5c2.3-0.2,4.5-0.5,6.8-0.7C88,19.6,86.6,17,85.2,14.5z",
  "M106.1,1.9c0.6,0,1.3-0.1,1.9-0.1c0.1,0,0.1,0,0.2,0c0.8-0.1,2.9-0.3,5.6-0.5c3.4-0.2,6.6-0.2,9.3,0c3.9,0.3,7.5,1.7,10,3.8c1.2,1,2.6,2.5,3.6,4.8c0.8,1.8,1.1,3.9,1.1,6.9c0.1,3.1-0.2,5.2-0.9,7c-0.8,2.3-2.1,3.9-3.2,4.9c-2.3,2.2-5.6,3.8-9.3,4.4c-2.6,0.5-5.6,0.7-9,0.8c-2.5,0.1-4.4,0.2-5.1,0.2c-0.1,0-0.2,0-0.3,0c-0.6,0-1.2,0-1.8,0.1c0-2.1,0.1-4.2,0.1-6.3c0.5,0,0.9-0.1,1.4-0.1c-0.4-6.6-0.8-13.2-1.3-19.8c-0.5,0.1-1,0.1-1.4,0.2C106.8,6.2,106.5,4,106.1,1.9zM130,12.1c-0.4-0.9-1-1.7-2-2.5c-1.2-1.1-3.3-1.9-5.5-2c-2-0.2-4.4-0.2-6.9-0.2c0.4,6.7,0.7,13.4,1.1,20.1c2.4-0.2,4.7-0.4,6.7-0.7c2.1-0.3,4-1.2,5.2-2.4c0.9-0.9,1.4-1.6,1.8-2.6c0.4-1,0.5-2.4,0.4-4.3c0-0.3,0-0.7,0-1C130.6,14.5,130.5,13.1,130,12.1C130,12.1,130,12.1,130,12.1z",
  "M146,26.2c-0.3-8.7-0.6-17.3-0.9-26c2.4-0.1,4.8-0.1,7.1-0.1c0.2,8.7,0.4,17.4,0.6,26.1c6.9,0,13.7,0.1,20.6,0.3c-0.1,2.2-0.2,4.4-0.3,6.7c-9.5-0.3-18.9-0.3-28.4-0.1c0-2.3,0-4.5-0.1-6.8C145.2,26.2,145.6,26.2,146,26.2z",
  "M192,27.7c-0.2,2.2-0.3,4.3-0.5,6.5c-3.9-0.3-7.8-0.5-11.8-0.7c0.1-2.2,0.2-4.4,0.3-6.5c0.8,0,1.7,0.1,2.5,0.1c0.4-6.6,0.7-13.1,1.1-19.7c-0.8,0-1.6-0.1-2.4-0.1c0.1-2.1,0.2-4.2,0.3-6.3c4,0.2,8.1,0.4,12.1,0.7c-0.1,2.1-0.3,4.2-0.4,6.3c-0.9-0.1-1.7-0.1-2.6-0.2c-0.4,6.6-0.9,13.1-1.3,19.7C190.3,27.6,191.2,27.6,192,27.7z",
  "M227.2,34.3c-1.7-0.2-3.4-0.4-5.1-0.6c-1,0.7-2.1,1.1-3.2,1.4c-1.8,0.6-3.9,0.8-5.9,0.6c-2-0.2-3.9-0.8-5.6-1.7c0,0,0,0-0.1-0.1c-1.7-0.9-3.2-2.2-4.4-3.7c-1.2-1.5-2.1-3.2-2.8-5.2c-0.6-2-0.9-4-0.7-6.1c0.2-2.1,0.8-4,1.7-5.9c0.9-1.8,2.2-3.3,3.7-4.7c1.6-1.2,3.3-2.2,5.2-2.8c2-0.7,4.1-0.9,6.1-0.7c2.1,0.2,4.1,0.9,5.9,2c1.8,0.9,3.3,2.2,4.6,3.8c0.9,1.2,1.5,2.4,2,3.6c-1.9,1.1-3.8,2.2-5.7,3.4c-0.3-1.1-0.8-2.1-1.5-3c-1.5-1.9-3.6-3.1-5.9-3.3c-2.3-0.2-4.6,0.5-6.4,2c-1.8,1.5-3,3.7-3.2,6.1c-0.2,2.4,0.5,4.8,2,6.6c1.4,1.9,3.4,3,5.7,3.3c2.3,0.2,4.5-0.5,6.3-2c0.1,0,0.1-0.2,0.3-0.2c-1.2-0.1-2.4-0.3-3.6-0.4c0.2-2.1,0.4-4.1,0.7-6.2c3.8,0.4,7.6,0.9,11.5,1.4C228.3,26,227.8,30.2,227.2,34.3z",
  "M242.2,30.5c-0.5,3.1-1.1,6.1-1.6,9.2c-2.2-0.4-4.5-0.8-6.7-1.2c0.5-3,1-6,1.5-9c-0.2,0-0.4-0.1-0.7-0.1c0.3-2.2,0.6-4.4,0.9-6.7c0.3,0,0.6,0.1,0.9,0.1c0.9-5.5,1.8-11.1,2.8-16.6c2.3,0.4,4.7,0.8,7,1.3c-1,5.5-1.9,10.9-2.9,16.4c4.1,0.6,8.1,1.3,12.2,2c0.8-5.5,1.6-11,2.4-16.4c2.3,0.3,4.7,0.7,7,1c-0.9,5.6-1.7,11.1-2.6,16.7c0.3,0,0.5,0.1,0.8,0.1c-0.4,2.2-0.8,4.4-1.2,6.6c-0.2,0-0.4-0.1-0.6-0.1c-0.5,3-0.9,6-1.4,9c-2.3-0.3-4.5-0.7-6.8-1c0.5-3.1,0.9-6.2,1.4-9.3C250.5,31.8,246.3,31.2,242.2,30.5z",
  "M281.6,21.3c-3.3-0.7-6.6-1.4-9.9-2c0.4-2.2,0.9-4.4,1.3-6.6c9,1.8,17.9,3.7,26.9,5.8c-0.5,2.2-1,4.4-1.6,6.5c-3.3-0.8-6.5-1.5-9.8-2.3c-1.9,8.3-3.8,16.6-5.7,24.9c-2.2-0.5-4.4-1-6.6-1.5C278.1,37.9,279.9,29.6,281.6,21.3z",
];

type PreloaderProps = Record<string, never>;

export const Preloader: React.FC<PreloaderProps> = () => {
  const [isReadySettled, setIsReadySettled] = useState(false);
  const previousOverflow = useRef("");
  const shouldReduceMotion = useReducedMotion();
  const { progress, isReady } = usePreloadAssets();

  // Smoothed display progress — animates toward the real progress value
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const progressValue = useMotionValue(0);
  const roundedProgress = useTransform(progressValue, (latest) =>
    Math.round(latest) === 99 ? 100 : Math.round(latest),
  );

  const canEnter = isReadySettled && hasReachedEnd;
  const isLoading = !canEnter;

  useEffect(() => {
    if (!isReady) return;

    let secondFrame = 0;
    let timer = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        timer = window.setTimeout(
          () => setIsReadySettled(true),
          shouldReduceMotion ? 80 : 220,
        );
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(timer);
    };
  }, [isReady, shouldReduceMotion]);

  // Animate displayProgress toward target using rAF and MotionValue
  useEffect(() => {
    let rafId: number;
    const minAnimDuration = shouldReduceMotion ? 800 : 2500;
    const targetProgress = Math.min(progress, 99);

    if (canEnter) return;

    function tick() {
      const current = progressValue.get();
      const diff = targetProgress - current;

      if (Math.abs(diff) < 0.01) {
        progressValue.set(targetProgress);
        return;
      }

      const minSpeed = 100 / (minAnimDuration / 16);
      const easedStep = Math.max(Math.abs(diff) * 0.08, minSpeed);
      const next =
        diff > 0
          ? Math.min(current + easedStep, targetProgress)
          : Math.max(current - easedStep, targetProgress);

      progressValue.set(next);
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [canEnter, progress, shouldReduceMotion, progressValue]);

  // Trigger exit when visually reaching 99
  useEffect(() => {
    const unsubscribe = roundedProgress.on("change", (latest) => {
      if (latest >= 99 && !hasReachedEnd) {
        setHasReachedEnd(true);
      }
    });
    return () => unsubscribe();
  }, [roundedProgress, hasReachedEnd]);

  useEffect(() => {
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  const restoreScroll = () => {
    document.body.style.overflow = previousOverflow.current;
  };

  return (
    <AnimatePresence onExitComplete={restoreScroll}>
      {isLoading && (
        <motion.div
          key="meadlight-preloader"
          className="fixed inset-0 z-[9999] flex h-[100svh] w-full items-center justify-center overflow-hidden bg-[#fff9ec] will-change-transform"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: shouldReduceMotion ? 0.3 : 1.2,
              ease: [0.85, 0, 0.15, 1],
            },
          }}
          aria-label="Loading Meadlight"
          role="status"
        >
          <motion.div
            className="pointer-events-none fixed inset-0 hidden bg-[url('/images/imgi_66_texture.jpg')] bg-[length:100%_auto] bg-top bg-repeat-y opacity-0 md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldReduceMotion ? 0.22 : 0.32 }}
          />

          <motion.div className="relative isolate w-[68vw] max-w-[450px] will-change-transform md:w-[42vw] xl:w-[26vw]">
            <motion.img
              src="/images/marchio_meadlight.svg"
              alt=""
              decoding="async"
              className="relative z-10 block w-full will-change-transform"
            />

            <svg
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-[120%] -translate-x-1/2 -translate-y-1/2 overflow-visible fill-[#1e1e1c]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -50 299.9 129.4"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="meadlight-title-shine"
                  x1="0"
                  x2="1"
                  y1="0"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#1e1e1c" stopOpacity="0" />
                  <stop offset="48%" stopColor="#f8b845" stopOpacity="0.72" />
                  <stop offset="100%" stopColor="#1e1e1c" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.g
                initial={shouldReduceMotion ? "visible" : "hidden"}
                animate="visible"
                transition={{
                  delay: shouldReduceMotion ? 0 : 0.35,
                  duration: shouldReduceMotion ? 0.2 : 0.9,
                  ease: enterEase,
                }}
              >
                {titlePaths.map((path, index) => (
                  <motion.path
                    key={path}
                    d={path}
                    custom={index}
                    variants={titleLetterVariants}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "50% 80%",
                    }}
                  />
                ))}
              </motion.g>
            </svg>

            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[145%] -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.72 }}
              animate={{
                opacity: shouldReduceMotion ? 0.18 : [0, 0.72, 0.32],
                scale: shouldReduceMotion ? 1 : [0.72, 1.08, 1],
              }}
            />
          </motion.div>

          <motion.p
            className="fixed bottom-[106px] left-0 w-full p-6 text-center font-mono text-xs font-normal uppercase tracking-[0.25em] text-[#1e1e1c]/50 md:bottom-[140px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.6,
              duration: shouldReduceMotion ? 0.2 : 0.8,
              ease: enterEase,
            }}
          >
            Loading <motion.span>{roundedProgress}</motion.span>%
          </motion.p>

          <motion.p
            className="fixed bottom-16 left-0 w-full px-6 text-center font-sans text-base font-light leading-none text-[#1e1e1c] md:bottom-[100px]"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: shouldReduceMotion ? 0 : 1.05,
              duration: shouldReduceMotion ? 0.25 : 1.15,
              ease: enterEase,
            }}
          >
            Bee-ing as fast as possible
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
