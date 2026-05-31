import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BackToHome from "../components/BackToHome";
import ServiceIcon from "../components/ServiceIcon";
import { servicesList } from "../data/services";

const panel = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardClass =
  "flex w-full flex-row items-center gap-4 border border-white/30 bg-black/40 px-4 py-3 shadow-[10px_10px_20px_rgba(0,0,0,0.6)] backdrop-blur-[2px] transition-colors duration-300 hover:border-accent hover:bg-black/60 no-underline sm:max-w-md md:h-[230px] md:w-[168px] md:max-w-[180px] md:flex-col md:justify-center md:gap-10 md:px-4 md:py-10 lg:w-[180px]";

export default function ServicesPage() {
  return (
    <main className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-3 pt-24 sm:px-6 sm:pb-4 sm:pt-28 md:px-10 md:pt-28 lg:px-12">
      <motion.div
        variants={item}
        initial="hidden"
        animate="visible"
        className="mt-1 shrink-0 sm:mt-2"
      >
        <BackToHome />
      </motion.div>

      <motion.div
        variants={panel}
        initial="hidden"
        animate="visible"
        className="flex min-h-0 flex-1 flex-col items-center justify-center py-2 sm:py-4"
      >
        <motion.p
          variants={item}
          className="text-[9px] tracking-[0.35em] text-white/50 uppercase sm:text-[10px]"
        >
          What we offer
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-1 font-serif text-2xl text-white uppercase italic sm:mt-2 sm:text-3xl md:text-4xl lg:text-5xl"
        >
          Services
        </motion.h1>

        <motion.div variants={item} className="mt-2 overflow-hidden sm:mt-3">
          <motion.div
            className="h-px w-20 bg-accent sm:w-24"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.75,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ originX: 0.5 }}
          />
        </motion.div>

        <motion.div
          variants={item}
          className="mt-4 flex w-full max-w-md flex-col gap-2.5 sm:mt-5 sm:gap-3 md:mt-8 md:max-w-none md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-10 lg:gap-x-36"
        >
          {servicesList.map(({ slug, label }) => (
            <Link key={slug} to={`/services/${slug}`} className={cardClass}>
              <ServiceIcon slug={slug} size={36} className="md:hidden" />
              <ServiceIcon slug={slug} className="hidden md:block" />
              <p className="text-left text-xs tracking-[0.18em] text-white uppercase sm:text-sm md:text-center md:tracking-[0.2em]">
                {label}
              </p>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
