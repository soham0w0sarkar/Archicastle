import { HugeiconsIcon } from "@hugeicons/react";
import {
  Award01Icon,
  Calendar03Icon,
  MessageMultiple01Icon,
  VideoReplayIcon,
} from "@hugeicons/core-free-icons";
import { TRAINING_FEATURES } from "../data/training";

const icons = [
  VideoReplayIcon,
  Calendar03Icon,
  MessageMultiple01Icon,
  Award01Icon,
];

export default function TrainingFeatureBar() {
  return (
    <div className="relative z-10 mt-4 w-full shrink-0 border-t border-white/10 bg-black/45 backdrop-blur-[3px] sm:mt-0 lg:mt-0">
      <div className="grid w-full grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 md:grid-cols-4">
        {TRAINING_FEATURES.map(({ title, description }, index) => (
          <div
            key={title}
            className="flex items-start gap-3 px-4 py-3.5 sm:items-center sm:px-5 sm:py-3.5 md:border-r md:border-white/10 md:last:border-r-0"
          >
            <HugeiconsIcon
              icon={icons[index]}
              size={18}
              color="currentColor"
              strokeWidth={1.5}
              className="mt-0.5 shrink-0 text-accent sm:mt-0"
            />
            <div className="min-w-0">
              <p className="text-[10px] tracking-[0.14em] text-white uppercase">
                {title}
              </p>
              <p className="mt-0.5 text-[10px] leading-snug text-white/45 sm:text-[11px]">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
