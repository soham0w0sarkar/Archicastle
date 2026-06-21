import { motion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import { Settings01Icon, UserGroupIcon } from "@hugeicons/core-free-icons";
import BackgroundImage from "../components/BackgroundImage";
import BlueprintCorners from "../components/BlueprintCorners";
import BookCallCtaLink from "../components/BookCall";
import Header from "../components/Header";
import PageShell from "../components/PageShell";
import TrainingFeatureBar from "../components/TrainingFeatureBar";
import TrainingIntroVideo from "../components/TrainingIntroVideo";
import {
  TRAINER,
  TRAINING_BACKGROUND,
  TRAINING_CTA,
  TRAINING_INTRO,
  TRAINING_INTRO_VIDEO,
} from "../data/training";

const panel = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const trainerStatIcons = [UserGroupIcon, Settings01Icon];

const pageX = "px-4 sm:px-5 lg:px-6 xl:px-8";
const panelClass =
  "relative border border-white/15 bg-black/55 backdrop-blur-[3px]";
const cardHeight = "lg:h-[min(52vh,440px)]";

function SectionEyebrow({ children }) {
  return (
    <p className="text-[10px] tracking-[0.35em] text-white/45 uppercase">
      {children}
    </p>
  );
}

function AccentRule({ className = "mt-3" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="h-px w-12 bg-accent sm:w-16" />
    </div>
  );
}

function BlueprintCtaLink({ to, state, eyebrow, label, arrow = "→" }) {
  return (
    <Link
      to={to}
      state={state}
      className="group relative inline-flex items-center gap-3 no-underline"
    >
      <span className="flex flex-col items-start gap-1">
        <span className="text-[9px] tracking-[0.35em] text-white/40 uppercase">
          {eyebrow}
        </span>
        <span className="text-[10px] tracking-[0.22em] text-white uppercase sm:text-xs">
          {label}
        </span>
        <span className="h-px w-6 bg-white/20 transition-all duration-300 group-hover:w-12 group-hover:bg-accent" />
      </span>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center border border-white/25 text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white sm:h-10 sm:w-10">
        <span
          className="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/35 transition-colors group-hover:border-white"
          aria-hidden
        />
        <span
          className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/35 transition-colors group-hover:border-white"
          aria-hidden
        />
        <span
          aria-hidden
          className="relative text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5"
        >
          {arrow}
        </span>
      </span>
    </Link>
  );
}

function ScrollContinueHint({ targetRef }) {
  return (
    <button
      type="button"
      onClick={() =>
        targetRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
      className="group mx-auto mt-6 hidden cursor-pointer items-center gap-3 border-0 bg-transparent p-0 lg:mt-auto lg:flex"
      aria-label="Scroll to continue"
    >
      <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase transition-colors duration-300 group-hover:text-white/45">
        Scroll to continue
      </span>
      <motion.span
        aria-hidden
        animate={{ y: [0, 3, 0] }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex h-7 w-7 shrink-0 items-center justify-center border border-white/15 transition-colors duration-300 group-hover:border-white/25"
      >
        <span
          className="absolute top-0 left-0 h-1.5 w-1.5 border-t border-l border-white/25 transition-colors group-hover:border-white/40"
          aria-hidden
        />
        <span
          className="absolute right-0 bottom-0 h-1.5 w-1.5 border-r border-b border-white/25 transition-colors group-hover:border-white/40"
          aria-hidden
        />
        <span className="relative text-sm leading-none text-accent">↓</span>
      </motion.span>
    </button>
  );
}

export default function TrainingPage() {
  const section2Ref = useRef(null);
  return (
    <PageShell
      className="bg-black"
      sectionClassName="page-section-fit"
      hideFooter
    >
      <BackgroundImage
        src={TRAINING_BACKGROUND}
        alt=""
        overlayClass="bg-black/35 backdrop-blur-md"
        imageClass="scale-105 blur-sm"
        fixed
        priority
        width={867}
        height={534}
      />

      <Header />

      <main className="relative z-10 lg:h-full lg:overflow-y-auto lg:scroll-smooth lg:snap-y lg:snap-mandatory">
        {/* Section 1 */}
        <section
          className={`w-full pb-8 pt-[5.5rem] sm:pb-10 sm:pt-28 lg:flex lg:min-h-dvh lg:snap-start lg:snap-always lg:flex-col lg:pb-6 ${pageX}`}
        >
          <motion.div
            variants={panel}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="flex w-full flex-col gap-3 sm:gap-4 lg:flex-1 lg:justify-center lg:gap-5 lg:py-6"
          >
            <motion.div variants={item} className="mb-1 sm:mb-2">
              <SectionEyebrow>Training introduction</SectionEyebrow>
              <h2 className="mt-2 font-serif text-[1.65rem] leading-tight uppercase italic sm:text-3xl xl:text-4xl">
                <span className="text-white">{TRAINING_INTRO.titleMain} </span>
                <span className="text-accent">
                  {TRAINING_INTRO.titleAccent}
                </span>
              </h2>
              <AccentRule />
              <div className="mt-4 grid gap-2.5 sm:mt-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
                {TRAINING_INTRO.paragraphs.map((text) => (
                  <p
                    key={text.slice(0, 24)}
                    className="text-[0.9rem] leading-relaxed text-white/80 sm:text-sm"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </motion.div>

            <div
              className={`grid w-full grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2 lg:items-stretch lg:gap-5 xl:gap-6 ${cardHeight}`}
            >
              <motion.div
                variants={item}
                className={`${panelClass} relative aspect-video w-full overflow-hidden sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-0`}
              >
                <BlueprintCorners />
                <TrainingIntroVideo
                  googleDriveFileId={TRAINING_INTRO_VIDEO.googleDriveFileId}
                  poster={TRAINING_INTRO_VIDEO.poster}
                />
              </motion.div>

              <motion.div
                variants={item}
                className={`${panelClass} flex flex-col justify-center p-5 sm:p-6 lg:p-7`}
              >
                <BlueprintCorners />
                <h3 className="font-serif text-xl text-white uppercase italic sm:text-2xl">
                  Book a{" "}
                  <span className="text-accent not-italic">consultation</span>
                </h3>
                <AccentRule />
                <p className="mt-4 text-sm leading-relaxed text-white/70 sm:mt-5">
                  Speak with us about your goals, experience level, and the
                  right batch for you.
                </p>
                <div className="mt-5 sm:mt-6">
                  <BookCallCtaLink
                    fallbackState={{
                      message: TRAINING_CTA.consultationMessage,
                    }}
                    eyebrow="Get in touch"
                    label="Book a call"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <ScrollContinueHint targetRef={section2Ref} />
        </section>

        {/* Section 2 */}
        <section
          ref={section2Ref}
          className="w-full pb-0 pt-[5.5rem] sm:pt-28 lg:flex lg:min-h-dvh lg:snap-start lg:snap-always lg:flex-col"
        >
          <div
            className={`w-full pb-4 lg:flex lg:min-h-0 lg:flex-1 lg:items-center ${pageX} lg:pb-5`}
          >
            <motion.div
              variants={panel}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              className="w-full"
            >
              <div className="flex flex-col gap-3 sm:gap-4 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-5 xl:gap-6">
                <motion.div
                  variants={item}
                  className={`${panelClass} relative aspect-[5/6] max-h-[52vh] overflow-hidden sm:aspect-[4/5] sm:max-h-[58vh] lg:aspect-auto lg:max-h-none lg:col-span-3 ${cardHeight}`}
                >
                  <BlueprintCorners />
                  <img
                    src={TRAINER.image}
                    alt={`${TRAINER.name} ${TRAINER.surname}`}
                    className="absolute inset-0 h-full w-full object-cover object-[center_15%]"
                    loading="lazy"
                    width={1024}
                    height={768}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent px-4 py-4 lg:hidden">
                    <p className="font-serif text-base text-white italic">
                      {TRAINER.name} {TRAINER.surname}
                    </p>
                    <p className="mt-0.5 text-[10px] tracking-[0.14em] text-white/55 uppercase">
                      {TRAINER.role}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={item}
                  className={`${panelClass} flex flex-col justify-center p-5 sm:p-6 lg:col-span-5 lg:p-7 ${cardHeight}`}
                >
                  <BlueprintCorners />
                  <SectionEyebrow>Know your trainer</SectionEyebrow>
                  <h2 className="mt-2 hidden font-serif text-2xl text-white uppercase sm:text-3xl lg:block xl:text-4xl">
                    {TRAINER.name}{" "}
                    <span className="text-accent italic">
                      {TRAINER.surname}
                    </span>
                  </h2>
                  <p className="mt-1 hidden text-[11px] tracking-[0.14em] text-white/55 uppercase lg:block">
                    {TRAINER.role}
                  </p>
                  <AccentRule className="mt-3 hidden lg:block" />

                  <p className="mt-1 text-sm leading-relaxed text-white/80 sm:text-[0.95rem] lg:mt-4">
                    {TRAINER.bio}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 border-y border-white/10 py-4 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-3 lg:mt-5">
                    {TRAINER.stats.map(({ value, label }, index) => (
                      <div key={label} className="flex items-center gap-2.5">
                        <HugeiconsIcon
                          icon={trainerStatIcons[index]}
                          size={20}
                          color="currentColor"
                          strokeWidth={1.5}
                          className="shrink-0 text-accent"
                        />
                        <div>
                          <p className="font-serif text-lg text-white italic">
                            {value}
                          </p>
                          <p className="text-[9px] leading-snug tracking-[0.12em] text-white/50 uppercase">
                            {label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <blockquote className="mt-4 hidden text-sm leading-relaxed text-white/70 italic sm:block">
                    &ldquo;{TRAINER.quote}&rdquo;
                  </blockquote>
                </motion.div>

                <motion.div
                  variants={item}
                  className={`${panelClass} relative min-h-[280px] overflow-hidden sm:min-h-[320px] lg:col-span-4 lg:min-h-0 ${cardHeight}`}
                >
                  <BlueprintCorners />
                  <img
                    src={TRAINING_CTA.image}
                    alt=""
                    aria-hidden
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover object-right"
                    loading="lazy"
                    width={570}
                    height={476}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/92 via-black/78 to-black/30"
                    aria-hidden
                  />

                  <div className="relative flex h-full flex-col justify-center p-5 sm:p-6 lg:p-7">
                    <SectionEyebrow>Next cohort</SectionEyebrow>
                    <h2 className="mt-2 font-serif text-xl text-white uppercase italic sm:text-2xl xl:text-3xl">
                      {TRAINING_CTA.title}{" "}
                      <span className="text-accent not-italic">
                        {TRAINING_CTA.titleAccent}
                      </span>
                    </h2>
                    <AccentRule />
                    <p className="mt-4 text-sm leading-relaxed text-white/75">
                      {TRAINING_CTA.description}
                    </p>
                    <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                      <BlueprintCtaLink
                        to="/contact"
                        state={{ message: TRAINING_CTA.enrollMessage }}
                        eyebrow="Join the program"
                        label="Enroll now"
                      />
                      <Link
                        to="/contact"
                        state={{ message: TRAINING_CTA.curriculumMessage }}
                        className="group inline-flex items-center gap-2 text-[10px] tracking-[0.22em] text-white uppercase no-underline"
                      >
                        View curriculum
                        <span className="text-accent transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <TrainingFeatureBar />
        </section>
      </main>
    </PageShell>
  );
}
