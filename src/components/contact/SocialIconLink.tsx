import { type ReactNode } from "react";

export const SocialIconLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative flex size-11 items-center justify-center text-[#464652] outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
    >
      <span className="sr-only">{label}</span>
      <span className="relative z-10 [&_svg]:size-5">{children}</span>
      <span
        className="absolute inset-1 rounded-full border border-[#f8b845] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      />
    </a>
  );
};
