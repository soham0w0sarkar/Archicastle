import { HugeiconsIcon } from "@hugeicons/react";
import {
  DocumentAttachmentIcon,
  DraftingCompassIcon,
  House01Icon,
} from "@hugeicons/core-free-icons";

const serviceIcons = {
  bim: House01Icon,
  drafting: DraftingCompassIcon,
  documentation: DocumentAttachmentIcon,
};

export default function ServiceIcon({ slug }) {
  const icon = serviceIcons[slug];
  if (!icon) return null;

  return (
    <HugeiconsIcon
      icon={icon}
      size={56}
      color="currentColor"
      strokeWidth={1.5}
      className="text-white"
    />
  );
}
