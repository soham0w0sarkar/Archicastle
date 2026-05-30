import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import InteractiveGrid from "../components/InteractiveGrid";
import PageShell from "../components/PageShell";
import publicUrl from "../utils/publicUrl";

const HERO_IMAGE = publicUrl("/images/hero.avif");

const hero = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const line1Words = [
  { text: "Design", accent: false },
  { text: "&", accent: true },
  { text: "Engineering", accent: false },
];

const qualityWords = ["quality", "life"];

export default function HomePage() {
  const headerRef = useRef(null);
  const heroRef = useRef(null);

  return (
    <PageShell className="bg-black">
      <BackgroundImage
        src={HERO_IMAGE}
        overlayClass="bg-black/45 backdrop-blur-sm"
        rotate={90}
        priority
        width={1920}
        height={1280}
      />
      <InteractiveGrid excludeRefs={[headerRef, heroRef]} />

      <div ref={headerRef} className="relative z-30">
        <Header />
      </div>

      <div className="page-content-overlay relative z-10 flex items-center justify-center overflow-hidden">
        <motion.div
          ref={heroRef}
          variants={hero}
          initial="hidden"
          animate="visible"
          className="relative max-w-3xl px-2 text-center md:px-4"
        >
          <motion.div
            variants={item}
            className="mx-auto mb-6 flex w-fit items-center gap-3 text-[15px] tracking-[0.35em] text-white/60 uppercase"
          >
            <span className="h-px w-8 bg-accent" />
            ArchiCastle
            <span className="text-accent">/</span>
            Studio
            <span className="h-px w-8 bg-white/30" />
          </motion.div>

          <motion.h1
            variants={item}
            className="text-2xl leading-tight font-light uppercase [word-spacing:0.15em] sm:text-3xl sm:[word-spacing:0.2em] md:text-4xl lg:text-5xl lg:[word-spacing:0.25em]"
          >
            {line1Words.map(({ text, accent }) => (
              <motion.span
                key={text}
                whileHover={{
                  y: -4,
                  color: accent ? undefined : "var(--color-accent)",
                }}
                className={`inline-block transition-colors ${accent ? "text-accent" : "text-white"}`}
              >
                {text}{" "}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 font-serif text-lg text-white/75 italic sm:mt-4 sm:text-xl md:text-2xl"
          >
            that builds
          </motion.p>

          <motion.div variants={item} className="mt-4 overflow-hidden sm:mt-5">
            <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
              {qualityWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.85 + index * 0.12,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-3xl font-light text-accent uppercase sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mx-auto mt-8 max-w-xs sm:mt-10"
          >
            <motion.div
              className="h-px bg-linear-to-r from-transparent via-accent to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 1.1,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ originX: 0.5 }}
            />
          </motion.div>

          <motion.div variants={item} className="mt-8 sm:mt-10">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/services"
                className="group relative inline-flex items-center gap-2 overflow-hidden border border-white/80 px-5 py-2 text-[10px] tracking-[0.3em] text-white uppercase no-underline sm:px-7 sm:py-2 sm:text-xs"
              >
                <span
                  className="absolute inset-0 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden
                />
                <span className="relative z-10 text-lg">Explore</span>
                <motion.span
                  className="relative z-10 text-lg text-accent group-hover:text-white"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    ease: "easeInOut",
                  }}
                >
                  &rarr;
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </PageShell>
  );
}
