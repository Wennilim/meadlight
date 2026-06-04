import { motion, AnimatePresence } from "framer-motion";
import { CircularBadge } from "./shared/CircularBadge";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = [
  { num: "", label: "Intro", href: "#intro" },
  { num: "01.", label: "Principio", href: "#features" },
  { num: "02.", label: "Honey", href: "#ingredients" },
  { num: "03.", label: "History", href: "#short-story" },
  { num: "04.", label: "Cocktails", href: "#cocktails" },
  { num: "", label: "Contacts", href: "#contact-section" },
];

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="pointer-events-auto fixed inset-0 z-[100] flex flex-col bg-white overflow-y-auto"
        >
          {/* Header Area Inside Menu */}
          <div className="flex w-full items-center justify-between px-[25px] py-[25px]">
            <img src="/logo.svg" alt="Meadlight" className="w-[75px]" />
            <div className="flex items-center gap-5">
              <img
                src="/images/imgi_2_buy_now.png"
                alt="Buy Now"
                className="w-[90px] cursor-pointer"
                onClick={() =>
                  window.open("https://meadlight.myshopify.com/", "_blank")
                }
              />
              <span className="text-sm font-medium text-gray-400">IT</span>
              <motion.button
                className="relative flex h-10 w-10 cursor-pointer items-center justify-center outline-none"
                onClick={onClose}
                initial="rest"
                whileHover="hover"
              >
                <span className="absolute h-[2px] w-4 rotate-45 bg-[#464652]" />
                <span className="absolute h-[2px] w-4 -rotate-45 bg-[#464652]" />
                <svg
                  viewBox="0 0 122 126"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[50px] w-[60px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
                  aria-hidden="true"
                >
                  <motion.path
                    fill="none"
                    stroke="#f8b845"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    vectorEffect="non-scaling-stroke"
                    d="M66 22.8c-9.4-.1-13.8-1.2-21.3.1-5 .8-12.5 1.9-19.3 7.9C10.4 44 .3 76.5 14.3 94.9c14.8 19.5 32.8 31.6 54.1 29.5 59.8-6 70.9-92 18.6-117.2-15.6-7.6-29.7-6-46.8-.8C25.4 10.8 3.7 24.6 1 40.7"
                    variants={{
                      rest: { pathLength: 0, opacity: 0 },
                      hover: { pathLength: 1, opacity: 0.8 },
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Menu Links */}
          <div className="flex flex-1 flex-col justify-center px-10 py-10">
            <div className="flex flex-col gap-6">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.08,
                    ease: "easeOut",
                  }}
                  className="flex items-baseline gap-4 group"
                >
                  <span className="w-6 text-sm font-medium text-[#464652] opacity-80 font-mono">
                    {item.num}
                  </span>
                  <span className="text-5xl sm:text-6xl font-bold text-[#464652] transition-colors group-hover:text-[#f8b845]">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-end justify-between px-10 pb-10"
          >
            <div className="flex flex-col gap-1 text-sm font-medium text-[#464652]">
              <div className="flex gap-4">
                <span className="w-4">M.</span>
                <a
                  href="mailto:INFO@MEADLIGHT.COM"
                  className="hover:text-[#f8b845]"
                >
                  INFO@MEADLIGHT.COM
                </a>
              </div>
              <div className="flex gap-4">
                <span className="w-4">P.</span>
                <a href="tel:+3902123456789" className="hover:text-[#f8b845]">
                  +39 02 123456789
                </a>
              </div>
              <div className="mt-4 flex gap-6">
                <a href="#" className="hover:text-[#f8b845]">
                  IG
                </a>
                <a href="#" className="hover:text-[#f8b845]">
                  FB
                </a>
                <a href="#" className="hover:text-[#f8b845]">
                  IN
                </a>
              </div>
            </div>

            <CircularBadge spin className="w-[100px] h-[100px]" />
          </motion.div>

          {/* Left yellow bar accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#f8b845]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
