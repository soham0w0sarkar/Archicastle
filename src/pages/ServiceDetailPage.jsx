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
    <main className="relative z-10 flex min-h-0 flex-1 flex-col px-4 pb-3 pt-28 sm:px-6 sm:pb-4 sm:pt-32 md:px-10 md:pt-28 lg:px-12">
      <motion.div
        variants={item}
        initial="hidden"
        animate="visible"
        className="mt-2 shrink-0 sm:mt-3"
      >
        <BackToServices />
      </motion.div>

      <motion.div
        key={service.slug}
        variants={panel}
        initial="hidden"
        animate="visible"
        className="mt-8 flex min-h-0 flex-1 flex-col overflow-hidden sm:mt-10 md:flex-row"
      >
        <div className="flex min-h-0 flex-1 flex-col items-center justify-start border-b border-white/10 px-5 py-6 text-center sm:px-8 md:w-1/2 md:border-r md:border-b-0 md:py-8 lg:px-12">
          <motion.div variants={item} className="flex justify-center">
            <ServiceIcon slug={service.slug} />
          </motion.div>

          <motion.div
            variants={item}
            className="mt-3 flex w-fit items-center gap-3 text-[10px] tracking-[0.35em] text-white/50 uppercase sm:mt-4"
          >
            <span className="h-px w-8 bg-accent" />
            Services
            <span className="h-px w-8 bg-white/30" />
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-2 font-serif text-2xl text-white uppercase italic sm:mt-3 sm:text-3xl md:text-4xl lg:text-5xl"
          >
            {service.title}
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-3 w-full max-w-xs overflow-hidden sm:mt-4"
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

        <div className="flex min-h-0 flex-1 flex-col justify-between px-5 py-6 sm:px-8 md:w-1/2 md:py-8 lg:px-12">
          <div className="space-y-3 sm:space-y-4">
            {service.paragraphs.map((text, index) => (
              <motion.p
                key={text.slice(0, 24)}
                variants={item}
                className="text-sm leading-relaxed text-white/85 italic sm:text-base"
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
            className="mt-8 shrink-0 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8"
          >
            <EnquireButton serviceName={service.title} />
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
