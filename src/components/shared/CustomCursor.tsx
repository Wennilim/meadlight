import { useCallback, useEffect, useRef, useState } from "react";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(pointer: coarse)").matches;
    }
    return false;
  });

  // Use rAF for buttery-smooth cursor tracking — zero spring delay
  const rafRef = useRef<number>(0);
  const mousePos = useRef({ x: -100, y: -100 });

  const updateCursor = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Cancel any pending frame and schedule a new one
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouchDevice, isVisible, updateCursor]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[10000]"
      style={{
        willChange: "transform",
        transform: "translate3d(-100px, -100px, 0)",
      }}
    >
      <div
        ref={dotRef}
        className="rounded-full"
        style={{
          width: isHovering ? 40 : 12,
          height: isHovering ? 40 : 12,
          backgroundColor: isHovering ? "transparent" : "#f8b845",
          borderWidth: isHovering ? 1.5 : 0,
          borderColor: "#f8b845",
          borderStyle: "solid",
          opacity: isVisible ? (isHovering ? 0.6 : 1) : 0,
          // Center the dot on the cursor point
          transform: `translate(-50%, -50%)`,
          // Smooth transitions for hover state changes only — not position
          transition:
            "width 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.15s ease, border-width 0.15s ease, opacity 0.15s ease",
        }}
      />
    </div>
  );
};
