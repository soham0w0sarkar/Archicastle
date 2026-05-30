import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BlueprintCorners from "../components/BlueprintCorners";
import BackgroundVideo from "../components/BackgroundVideo";
import Header from "../components/Header";
import PageShell from "../components/PageShell";

const ABOUT_VIDEO = {
  mp4: "/videos/about/hero.mp4",
  webm: "/videos/about/hero.webm",
  poster: "/videos/about/poster.webp",
};

const paragraphs = [
  "ARCHI CASTLE is a team of Architects, engineers and BIM professionals. We are BIM service and training provider.",
  "We understand the use of modern tools and technologies that requires to increase the work flow with in AECO industry.",
  "Archi castle is well equipped with the modern tools and professionals to help our client with a virtual design for better analysis before construction.",
];

const disciplines = ["Architecture", "Engineering", "BIM"];

const panel = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

export default function AboutPage() {
  return (
    <PageShell className="bg-black" sectionClassName="min-h-[50vh] lg:min-h-0">
      <BackgroundVideo
        mp4={ABOUT_VIDEO.mp4}
        webm={ABOUT_VIDEO.webm}
        poster={ABOUT_VIDEO.poster}
        overlayClass="bg-black/30"
        videoClass="grayscale"
        className="z-0"
      />
      <Header />

      <div className="page-content-overlay relative flex flex-1 items-center justify-center overflow-hidden">
        <div className="relative mx-auto w-full max-w-lg">
          <motion.div
            variants={panel}
            initial="hidden"
            animate="visible"
            className="relative border border-white/10 bg-black/70 p-6 backdrop-blur-[2px] sm:p-8 md:p-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          >
            <BlueprintCorners />

            <motion.p
              variants={item}
              className="text-[10px] tracking-[0.35em] text-white/50 uppercase"
            >
              Who we are
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-2 font-serif text-3xl text-white uppercase italic sm:text-4xl md:text-5xl"
            >
              About us
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-4 overflow-hidden sm:mt-5"
            >
              <motion.div
                className="h-px bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.75,
                  delay: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ originX: 0 }}
              />
            </motion.div>

            <motion.ul
              variants={item}
              className="mt-5 flex flex-wrap gap-2 sm:mt-6"
            >
              {disciplines.map((label) => (
                <li
                  key={label}
                  className="border border-white/20 px-3 py-1 text-[10px] tracking-[0.2em] text-white/80 uppercase"
                >
                  {label}
                </li>
              ))}
            </motion.ul>

            <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
              {paragraphs.map((text, index) => (
                <motion.p
                  key={text.slice(0, 24)}
                  variants={item}
                  className="text-sm leading-relaxed text-white/85 italic"
                >
                  <span className="mr-2 font-serif text-accent not-italic">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div variants={item} className="mt-8 sm:mt-10">
              <Link
                to="/services"
                className="group inline-flex items-center gap-3 bg-accent px-6 py-2.5 text-[10px] font-semibold tracking-[0.2em] text-white uppercase no-underline transition-colors hover:bg-accent-hover sm:px-8 sm:text-xs"
              >
                Read more
                <span className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-4 flex items-center gap-3 text-[10px] tracking-[0.25em] text-white/40 uppercase"
          >
            <span className="h-px flex-1 bg-white/20" />
            Est. AECO industry
            <span className="h-px flex-1 bg-white/20" />
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}
