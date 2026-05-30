import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BackToHome from "./BackToHome";

const panel = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

export default function NotFoundContent({ backLink = <BackToHome /> }) {
  return (
    <motion.div
      variants={panel}
      initial="hidden"
      animate="visible"
      className="flex w-full max-w-lg flex-col items-center text-center"
    >
      <motion.div
        variants={item}
        className="flex items-center gap-3 text-[10px] tracking-[0.35em] text-white/50 uppercase"
      >
        <span className="h-px w-8 bg-accent" />
        Error
        <span className="h-px w-8 bg-white/30" />
      </motion.div>

      <motion.p
        variants={item}
        className="mt-4 font-serif text-7xl text-accent italic sm:text-8xl md:text-9xl"
      >
        404
      </motion.p>

      <motion.h1
        variants={item}
        className="mt-3 font-serif text-2xl text-white uppercase italic sm:text-3xl md:text-4xl"
      >
        Page not found
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-4 max-w-sm text-sm leading-relaxed text-white/70 italic sm:text-base"
      >
        The page you are looking for may have been moved, removed, or never
        existed.
      </motion.p>

      <motion.div
        variants={item}
        className="mt-6 w-full max-w-xs overflow-hidden sm:mt-8"
      >
        <motion.div
          className="h-px bg-linear-to-r from-transparent via-accent to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.85,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ originX: 0.5 }}
        />
      </motion.div>

      <motion.div
        variants={item}
        className="mt-8 flex flex-col items-center gap-6 sm:mt-10 sm:flex-row"
      >
        {backLink}

        <Link
          to="/services"
          className="group inline-flex items-center gap-3 text-[10px] tracking-[0.22em] text-white uppercase no-underline sm:text-xs"
        >
          View services
          <span className="h-px w-6 bg-white/20 transition-all duration-300 group-hover:w-12 group-hover:bg-accent" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
