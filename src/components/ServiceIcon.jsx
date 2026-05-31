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

export default function ServiceIcon({ slug, size = 56, className = "" }) {
  const icon = serviceIcons[slug];
  if (!icon) return null;

  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      color="currentColor"
      strokeWidth={1.5}
      className={`shrink-0 text-white ${className}`}
    />
  );
}
