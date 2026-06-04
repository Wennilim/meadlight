import { useState } from "react";
import { MobileMenu } from "./MobileMenu";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pointer-events-none">
        <img
          src="/logo.svg"
          alt="Meadlight"
          className="pointer-events-auto absolute left-[25px] top-[25px] w-[75px] md:w-[100px] xl:left-[85px] xl:top-[40px]"
        />
        <div className="pointer-events-auto absolute right-[28px] top-[35px] flex items-center gap-7 md:right-[55px] md:top-[40px] xl:right-[85px] xl:top-[60px]">
          <img
            src="/images/imgi_2_buy_now.png"
            alt="Buy Now"
            className="w-[90px] cursor-pointer"
            onClick={() =>
              window.open("https://meadlight.myshopify.com/", "_blank")
            }
          />
          <button
            type="button"
            className="flex h-7 w-9 cursor-pointer flex-col items-center justify-center gap-2 md:hidden"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="block h-[2px] w-9 bg-[#464652]" />
            <span className="block h-[2px] w-9 bg-[#464652]" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
