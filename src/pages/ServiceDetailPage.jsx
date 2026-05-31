import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import BackToServices from "../components/BackToServices";
import EnquireButton from "../components/EnquireButton";
import NotFoundContent from "../components/NotFoundContent";
import ServiceIcon from "../components/ServiceIcon";
import { getServiceBySlug } from "../data/services";

const panel = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <main className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-8 pt-28 sm:px-6 sm:pt-32 md:px-10 lg:px-12">
        <NotFoundContent backLink={<BackToServices />} />
      </main>
    );
  }

  return (
    <main className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-6 pt-24 sm:px-6 sm:pb-4 sm:pt-28 md:overflow-hidden md:px-10 md:pb-3 md:pt-28 lg:px-12">
      <motion.div
        variants={item}
        initial="hidden"
        animate="visible"
        className="mt-1 shrink-0 sm:mt-2"
      >
        <BackToServices />
      </motion.div>

      <motion.div
        key={service.slug}
        variants={panel}
        initial="hidden"
        animate="visible"
        className="mt-4 flex min-h-0 flex-1 flex-col sm:mt-6 md:mt-10 md:flex-row md:overflow-hidden"
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-white/10 px-2 py-3 sm:gap-4 sm:px-4 sm:py-4 md:min-h-0 md:flex-1 md:flex-col md:items-center md:justify-start md:px-8 md:py-8 md:text-center lg:px-12">
          <motion.div variants={item} className="shrink-0 md:flex md:justify-center">
            <ServiceIcon slug={service.slug} size={40} className="md:hidden" />
            <ServiceIcon slug={service.slug} className="hidden md:block" />
          </motion.div>

          <div className="min-w-0 flex-1 text-left md:flex md:flex-col md:items-center md:text-center">
            <motion.div
              variants={item}
              className="hidden w-fit items-center gap-3 text-[10px] tracking-[0.35em] text-white/50 uppercase md:mt-4 md:flex"
            >
              <span className="h-px w-8 bg-accent" />
              Services
              <span className="h-px w-8 bg-white/30" />
            </motion.div>

            <motion.p
              variants={item}
              className="text-[9px] tracking-[0.3em] text-white/50 uppercase md:hidden"
            >
              Services
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-0.5 font-serif text-xl text-white uppercase italic sm:text-2xl md:mt-2 md:text-3xl lg:text-4xl xl:text-5xl"
            >
              {service.title}
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-2 hidden w-full max-w-xs overflow-hidden md:mt-4 md:block"
            >
              <motion.div
                className="h-px bg-linear-to-r from-transparent via-accent to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ originX: 0.5 }}
              />
            </motion.div>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-between px-2 py-4 sm:px-4 sm:py-5 md:w-1/2 md:px-8 md:py-8 lg:px-12">
          <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
            {service.paragraphs.map((text, index) => (
              <motion.p
                key={text.slice(0, 24)}
                variants={item}
                className="text-xs leading-relaxed text-white/85 italic sm:text-sm md:text-base"
              >
                <span className="mr-2 font-serif text-accent not-italic">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {text}
              </motion.p>
            ))}
          </div>

          <motion.div
            variants={item}
            className="mt-5 shrink-0 border-t border-white/10 pt-4 sm:mt-6 sm:pt-5 md:mt-8 md:pt-6 lg:mt-10 lg:pt-8"
          >
            <EnquireButton serviceName={service.title} />
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
