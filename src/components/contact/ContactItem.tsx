import { type ReactNode } from "react";

export const ContactItem = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <div className="min-w-0">
      <p className="mb-2 text-sm uppercase tracking-[0.03em] text-[#464652]/80 md:mb-3 md:text-base">
        {label}
      </p>
      <div className="break-words text-base font-normal uppercase leading-tight text-[#464652] md:text-lg">
        {children}
      </div>
    </div>
  );
};
