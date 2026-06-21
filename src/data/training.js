import publicUrl from "../utils/publicUrl";

export const TRAINING_BACKGROUND = publicUrl("/images/training/background.png");

export const TRAINING_INTRO_VIDEO = {
  /** Streams from Google Drive — no 900MB file in the repo. Must be shared: anyone with the link. */
  googleDriveFileId: "1HVqeDsqn6GDdQ2ryn7FDdNTgHgWcrjFY",
  poster: publicUrl("/images/training/background.png"),
};

export const TRAINING_INTRO = {
  titleMain: "Welcome to the",
  titleAccent: "training",
  paragraphs: [
    "This program is designed for architects and engineers who want to move from basics to confident BIM delivery.",
    "Sessions combine live instruction, hands-on exercises, and real-world project scenarios so you learn by doing.",
    "Whether you are starting out or levelling up, you will build skills that translate directly to professional practice.",
  ],
};

export const TRAINER = {
  name: "Soumya",
  surname: "Sarkar",
  role: "Architect · BIM Professional · Educator",
  image: publicUrl("/images/training/trainer.png"),
  bio: "Soumya brings years of hands-on BIM experience across architecture and engineering projects. He has trained professionals and students to adopt modern AEC workflows with clarity, structure, and confidence.",
  quote:
    "My goal is simple — to help you think like a professional, work with industry-standard tools, and deliver BIM with confidence.",
  stats: [
    { value: "1000+", label: "Students trained" },
    { value: "Industry", label: "Standard workflows" },
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
