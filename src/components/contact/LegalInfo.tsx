import { motion } from "framer-motion";

export const LegalInfo = () => {
  return (
    <motion.div
      key="legal-info"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="max-w-[980px] text-[18px] font-thin leading-relaxed text-[#464652]/80 md:text-lg"
    >
      <p>Meadlight Drinks Srl - P.Iva 02672560022 - C.F. 02672560022</p>
      <p className="mt-3">
        Sede Produttiva: Via del Romanino, 4 - 13871 Benna (BI) - Italia -{" "}
        <a
          href="https://www.iubenda.com/privacy-policy/82150019"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[#f5a623] focus-visible:text-[#f5a623]"
        >
          Privacy & cookie.
        </a>
      </p>
    </motion.div>
  );
};
