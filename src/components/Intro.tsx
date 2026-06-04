import { HoneyUnderline } from "./shared/HoneyUnderline";

export const Intro = () => {
  return (
    <section id="first-section" className="pointer-events-none relative z-40 grid min-h-screen w-full grid-cols-[repeat(29,minmax(0,1fr))] items-center mix-blend-multiply md:grid-cols-[repeat(16,minmax(0,1fr))]">
      <div className="col-start-3 col-end-[21] -translate-y-10 md:col-start-4 md:col-end-11 md:translate-y-0 pt-20">
        <span className="mb-5 block text-[13px] font-light uppercase leading-none tracking-normal text-[#464652] min-[640px]:text-[16px] md:mb-7 md:text-[15px] xl:text-[20px] min-[1680px]:text-[24px] min-[1920px]:text-[28px]">
          the brand-new drink
        </span>
        <h1 className="font-merlod-queue text-[42px] sm:text-[54px] font-bold leading-none tracking-normal text-[#3e3a34] md:text-[68px] xl:text-[112px] min-[1680px]:text-[145px] min-[1920px]:text-[168px]">
          <HoneyUnderline active={true}>Principio</HoneyUnderline>{" "}
          is a
          <br />
          fermented
          <span className="hidden min-[1900px]:inline"> honey</span>
          <br />
          <span className="min-[1900px]:hidden">honey </span>
          drink
        </h1>
      </div>
    </section>
  );
};
