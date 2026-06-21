import publicUrl from "../utils/publicUrl";

export const TRAINING_BACKGROUND = publicUrl("/images/training/background.png");

export const TRAINING_INTRO_VIDEO = {
  /** Streams from Google Drive — no 900MB file in the repo. Must be shared: anyone with the link. */
  googleDriveFileId: "1HVqeDsqn6GDdQ2ryn7FDdNTgHgWcrjFY",
  poster: publicUrl("/images/training/intro-thumbnail.png"),
};

export const TRAINING_INTRO = {
  titleMain: "Become a Construction Risk Analyst",
  titleAccent: "with BIM",
  paragraphs: [
    "Most people learn BIM and stop at modelling - building elements in Revit, producing sheets, ticking off deliverables. But that's only the surface.",
    "BIM is so much more than modelling. Used right, it's how you understand the technical realities of construction before they become problems on site - clashes, clearances, coordination gaps, the things that turn into delays and change orders.",
    "This program takes you deeper. You won't just learn to model — you'll learn to read a building the way a risk analyst does, understand what BIM data is actually telling you, and use it to catch problems early.",
  ],
  closing:
    "Stop being just a BIM modeller. Start your journey to becoming a construction risk analyst.",
};

export const TRAINER = {
  name: "Soumya",
  surname: "Sarkar",
  role: "BIM Lead · Autodesk Certified Professional · Educator",
  image: publicUrl("/images/training/trainer.png"),
  paragraphs: [
    "I believe the true value of BIM lies beyond modelling.",
    "Having worked on BIM projects across the UAE, I've seen how BIM can be used to identify risks, improve coordination, and prevent costly site issues before construction begins.",
    "My goal is to help you develop the mindset of a construction risk analyst—not just a BIM modeller.",
  ],
  quote:
    "Don't just learn how to model a building. Learn how to read one.",
  stats: [
    { value: "1000+", label: "Professionals Trained" },
    { value: "Real-World", label: "BIM Experience" },
  ],
};

export const TRAINING_FEATURES = [
  {
    title: "Live interactive sessions",
    description: "Learn directly with your trainer",
  },
  {
    title: "Flexible schedule",
    description: "Weekend & weekday batches",
  },
  {
    title: "Personalized support",
    description: "Doubt clearing & guidance",
  },
  {
    title: "Certificate of completion",
    description: "Boost your professional profile",
  },
];

export const TRAINING_CTA = {
  title: "Ready to start your",
  titleAccent: "BIM journey?",
  image: publicUrl("/images/training/cta-wireframe.png"),
  description:
    "Join our next cohort and learn BIM the way it is practiced in the industry — structured, practical, and mentor-led.",
  enrollMessage:
    "I would like to enroll in the ArchiCastle BIM training program.\n\nPlease share batch details and enrollment steps.",
  consultationMessage:
    "I would like to book a consultation call about ArchiCastle BIM training.\n\nPlease suggest a suitable time.",
  curriculumMessage:
    "I would like to know more about the ArchiCastle BIM training curriculum.\n\nPlease share module details and learning outcomes.",
};
