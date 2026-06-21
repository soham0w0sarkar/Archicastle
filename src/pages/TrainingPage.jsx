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
const introPanelClass =
  "relative overflow-hidden rounded-lg border border-white/15 bg-black/50 backdrop-blur-sm";
const cardHeight = "lg:h-[min(46vh,380px)]";
const section2CardHeight = "lg:h-[min(60vh,500px)]";

function SectionEyebrow({ children }) {
  return (
    <p className="text-[10px] tracking-[0.35em] text-white/45 uppercase">
      {children}
    </p>
  );
}

function AccentRule({ className = "mt-3", centered = false }) {
  return (
    <div
      className={`overflow-hidden ${centered ? "flex justify-center" : ""} ${className}`}
    >
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

function ScrollNavHint({ targetRef, label, direction = "down", className = "" }) {
  const isDown = direction === "down";

  return (
    <button
      type="button"
      onClick={() =>
        targetRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
      className={`group mx-auto hidden shrink-0 cursor-pointer items-center gap-3 border-0 bg-transparent p-0 lg:flex ${className}`}
      aria-label={label}
    >
      <span className="text-[10px] tracking-[0.3em] text-white/30 uppercase transition-colors duration-300 group-hover:text-white/45">
        {label}
      </span>
      <motion.span
        aria-hidden
        animate={{ y: isDown ? [0, 3, 0] : [0, -3, 0] }}
        transition={{
          duration: 1.4,
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
        <span className="relative text-sm leading-none text-accent">
          {isDown ? "↓" : "↑"}
        </span>
      </motion.span>
    </button>
  );
}

export default function TrainingPage() {
  const section1Ref = useRef(null);
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
          ref={section1Ref}
          className={`flex w-full flex-col pb-6 pt-[5.5rem] sm:pb-8 sm:pt-28 lg:min-h-dvh lg:snap-start lg:snap-always lg:justify-between lg:pb-5 lg:pt-24 ${pageX}`}
        >
          <motion.div
            variants={panel}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className="flex w-full flex-col gap-2 sm:gap-3 lg:gap-4 lg:pt-1"
          >
            <motion.div
              variants={item}
              className="mx-auto w-full max-w-3xl text-center lg:max-w-4xl"
            >
              <SectionEyebrow>Training introduction</SectionEyebrow>
              <h2 className="mt-2 font-serif text-[1.75rem] leading-tight italic sm:mt-2.5 sm:text-4xl xl:text-[2.65rem]">
                <span className="block text-white">{TRAINING_INTRO.titleMain}</span>
                <span className="block text-accent">{TRAINING_INTRO.titleAccent}</span>
              </h2>
              <AccentRule centered className="mt-3" />
            </motion.div>

            <div
              className={`mt-3 grid w-full grid-cols-1 gap-3 sm:gap-4 lg:mt-4 lg:grid-cols-12 lg:items-stretch lg:gap-4 xl:gap-5 ${cardHeight}`}
            >
              <motion.div
                variants={item}
                className="order-1 flex flex-col justify-center lg:order-0 lg:col-span-4"
              >
                <div className="space-y-3 text-sm leading-relaxed text-white/80 sm:space-y-4 sm:text-[0.9375rem]">
                  {TRAINING_INTRO.paragraphs.map((text) => (
                    <p key={text.slice(0, 24)}>{text}</p>
                  ))}
                  {TRAINING_INTRO.closing && (
                    <p className="font-semibold text-white">
                      {TRAINING_INTRO.closing}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className={`${introPanelClass} relative order-2 aspect-video w-full sm:aspect-[16/10] lg:order-0 lg:col-span-6 lg:aspect-auto lg:h-full lg:min-h-0`}
              >
                <TrainingIntroVideo
                  googleDriveFileId={TRAINING_INTRO_VIDEO.googleDriveFileId}
                  poster={TRAINING_INTRO_VIDEO.poster}
                />
              </motion.div>

              <motion.div
                variants={item}
                className={`${introPanelClass} order-3 flex flex-col justify-center p-3 sm:p-4 lg:order-0 lg:col-span-2 lg:p-4`}
              >
                <h3 className="font-serif text-base leading-snug text-white italic sm:text-lg">
                  Book a{" "}
                  <span className="text-accent not-italic">Consultation</span>
                </h3>
                <AccentRule className="mt-2" />
                <p className="mt-2.5 text-[11px] leading-snug text-white/70 sm:mt-3">
                  Speak with us about your goals, experience level, and the right
                  batch for you.
                </p>
                <div className="mt-3 sm:mt-4">
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

          <ScrollNavHint
            targetRef={section2Ref}
            label="Scroll to continue"
            direction="down"
            className="mt-8 lg:mt-auto lg:mb-1"
          />
        </section>

        {/* Section 2 */}
        <section
          ref={section2Ref}
          className="flex w-full flex-col pb-0 pt-[5.5rem] sm:pt-28 lg:min-h-dvh lg:snap-start lg:snap-always lg:justify-between"
        >
          <ScrollNavHint
            targetRef={section1Ref}
            label="Scroll to top"
            direction="up"
            className="mb-12 shrink-0 lg:mb-4"
          />

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
                  className={`${panelClass} relative aspect-[5/6] max-h-[52vh] overflow-hidden sm:aspect-[4/5] sm:max-h-[58vh] lg:aspect-auto lg:max-h-none lg:col-span-3 ${section2CardHeight}`}
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
                  className={`${panelClass} flex min-h-0 flex-col overflow-hidden p-4 sm:p-5 lg:col-span-5 lg:p-5 ${section2CardHeight}`}
                >
                  <BlueprintCorners />

                  <div className="shrink-0">
                    <SectionEyebrow>Know your trainer</SectionEyebrow>
                    <h2 className="mt-1.5 hidden font-serif text-xl text-white uppercase sm:text-2xl lg:block xl:text-3xl">
                      {TRAINER.name}{" "}
                      <span className="text-accent italic">
                        {TRAINER.surname}
                      </span>
                    </h2>
                    <p className="mt-1 hidden text-[10px] leading-snug tracking-[0.12em] text-white/55 uppercase lg:block">
                      {TRAINER.role}
                    </p>
                    <AccentRule className="mt-2 hidden lg:block" />
                  </div>

                  <div className="mt-2 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-0.5 lg:mt-3 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20">
                    <div className="space-y-2 text-[0.8125rem] leading-snug text-white/80 sm:text-sm sm:leading-normal">
                      {TRAINER.paragraphs.map((text) => (
                        <p key={text.slice(0, 32)}>{text}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 shrink-0 border-t border-white/10 pt-3">
                    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
                      {TRAINER.stats.map(({ value, label }, index) => (
                        <div key={label} className="flex items-center gap-2">
                          <HugeiconsIcon
                            icon={trainerStatIcons[index]}
                            size={16}
                            color="currentColor"
                            strokeWidth={1.5}
                            className="shrink-0 text-accent"
                          />
                          <div>
                            <p className="font-serif text-base leading-none text-white italic">
                              {value}
                            </p>
                            <p className="mt-0.5 text-[8px] leading-snug tracking-[0.1em] text-white/50 uppercase">
                              {label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <blockquote className="mt-2.5 text-xs leading-snug text-white/70 italic sm:text-sm">
                      &ldquo;{TRAINER.quote}&rdquo;
                    </blockquote>
                  </div>
                </motion.div>

                <motion.div
                  variants={item}
                  className={`${panelClass} relative min-h-[280px] overflow-hidden sm:min-h-[320px] lg:col-span-4 lg:min-h-0 ${section2CardHeight}`}
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
                      <BookCallCtaLink
                        fallbackState={{
                          message: TRAINING_CTA.consultationMessage,
                        }}
                        eyebrow="Get in touch"
                        label="Book a call"
                      />
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
