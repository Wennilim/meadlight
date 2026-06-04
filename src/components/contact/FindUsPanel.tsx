import { motion } from "framer-motion";
import { places } from "../../data/contact";

export const FindUsPanel = () => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="mt-8 bg-[#f8b845]/90 px-6 py-8 text-[#464652] md:mt-12 md:px-10 lg:px-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.04em]">
              Fantastic aperitifs and
            </p>
            <h3 className="mt-2 text-4xl font-semibold leading-none sm:text-5xl">
              Where to Find Them
            </h3>
          </div>

          <div className="grid gap-8">
            {places.map((region) => (
              <div
                key={region.region}
                className="grid gap-4 border-t border-[#e89e17] pt-5 md:grid-cols-[120px_1fr]"
              >
                <h4 className="text-lg font-normal">{region.region}</h4>
                <div className="grid gap-3">
                  {region.locations.map((location) => (
                    <a
                      key={location.name}
                      href={location.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid gap-1 border-b border-[#e89e17]/70 pb-3 text-sm uppercase leading-snug outline-none md:grid-cols-[1fr_1.2fr_auto] md:items-center md:gap-6"
                    >
                      <span className="font-semibold">{location.name}</span>
                      <span>{location.address}</span>
                      <span className="inline-flex items-center gap-2 normal-case opacity-70 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                        Google maps
                        <span
                          className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
                          aria-hidden="true"
                        >
                          {"->"}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
