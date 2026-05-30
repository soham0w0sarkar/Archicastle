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
  "flex h-[230px] w-[42vw] max-w-[180px] flex-col items-center justify-center gap-10 border border-white/30 bg-black/40 px-4 py-10 shadow-[10px_10px_20px_rgba(0,0,0,0.6)] backdrop-blur-[2px] transition-colors duration-300 hover:border-accent hover:bg-black/60 min-[480px]:h-[230px] min-[480px]:w-[168px] lg:h-[230px] lg:w-[180px] no-underline";

export default function ServicesPage() {
  return (
    <main className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-3 pt-28 sm:px-6 sm:pb-4 sm:pt-32 md:px-10 md:pt-28 lg:px-12">
      <motion.div
        variants={item}
        initial="hidden"
        animate="visible"
        className="mt-2 shrink-0 sm:mt-3"
      >
        <BackToHome />
      </motion.div>

      <motion.div
        variants={panel}
        initial="hidden"
        animate="visible"
        className="flex flex-1 flex-col items-center justify-start pt-2 sm:pt-4"
      >
        <motion.p
          variants={item}
          className="text-[10px] tracking-[0.35em] text-white/50 uppercase"
        >
          What we offer
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-2 font-serif text-3xl text-white uppercase italic sm:text-4xl md:text-5xl"
        >
          Services
        </motion.h1>

        <motion.div variants={item} className="mt-4 overflow-hidden sm:mt-5">
          <motion.div
            className="h-px w-24 bg-accent"
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
          className="mt-6 flex flex-wrap items-center justify-center gap-x-36 gap-y-6 sm:mt-8 sm:gap-x-10 lg:gap-x-36"
        >
          {servicesList.map(({ slug, label }) => (
            <Link key={slug} to={`/services/${slug}`} className={cardClass}>
              <ServiceIcon slug={slug} />
              <p className="text-center text-sm tracking-[0.2em] text-white uppercase">
                {label}
              </p>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
