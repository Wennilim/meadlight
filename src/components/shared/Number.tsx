export const Number = ({ num }: { num: string }) => {
  return (
    <div className="relative inline-block">
      <img
        src="/images/imgi_60_default.svg"
        alt="circle handwriting pattern"
        className="size-25"
      />
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-merlod-queue text-[40px] text-[#464652]">
        {num}
      </p>
    </div>
  );
};
