import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { sendContactEmail } from "../api/contact";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import PageShell from "../components/PageShell";
import { PAGE_BACKGROUNDS } from "../data/backgroundAssets";

const FIELDS = ["name", "email", "phone", "message"];

const panel = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function MailIcon({ className = "h-12 w-12" }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function fieldVisible(currentField, field) {
  return FIELDS.indexOf(currentField) >= FIELDS.indexOf(field);
}

function inputClass(field, currentField) {
  const isActive = currentField === field;
  return [
    "w-full border-0 border-b bg-transparent px-2 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none disabled:text-white/70",
    isActive ? "border-accent" : "border-white/30",
    "focus:border-accent",
  ].join(" ");
}

function ContactForm({ prefilledMessage = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: prefilledMessage,
  });
  const [currentField, setCurrentField] = useState("name");
  const [submitState, setSubmitState] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const refs = {
    name: nameInputRef,
    email: emailInputRef,
    phone: phoneInputRef,
    message: messageInputRef,
  };

  const focusField = (field) => {
    requestAnimationFrame(() => refs[field]?.current?.focus());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const advanceFrom = (field) => {
    const index = FIELDS.indexOf(field);
    if (index < FIELDS.length - 1) {
      const next = FIELDS[index + 1];
      setCurrentField(next);
      focusField(next);
    }
  };

  const handleKeyDown = (e, field) => {
    if (e.key !== "Enter") return;
    if (field === "message" && e.shiftKey) return;

    e.preventDefault();

    if (field === "message") {
      submitForm();
      return;
    }

    if (formData[field].trim()) {
      advanceFrom(field);
    }
  };

  const submitForm = async () => {
    if (submitState === "sending") return;

    const { name, email, phone, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitState("sending");
    setSubmitError("");

    try {
      await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
      setCurrentField("name");
      setSubmitState("success");
      focusField("name");
    } catch (error) {
      setSubmitState("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.",
      );
    }
  };

  const closeOverlay = () => {
    setSubmitState("idle");
    setSubmitError("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const fields = [
    {
      key: "name",
      type: "text",
      name: "name",
      placeholder: (active) =>
        active ? "Type your name and press Enter" : "Name",
      disabled: currentField !== "name" && formData.name !== "",
    },
    {
      key: "email",
      type: "email",
      name: "email",
      placeholder: (active) =>
        active ? "Type your email and press Enter" : "Email",
      disabled: currentField !== "email",
    },
    {
      key: "phone",
      type: "tel",
      name: "phone",
      placeholder: (active) =>
        active ? "Type your contact no. and press Enter" : "Contact no.",
      disabled: currentField !== "phone",
    },
    {
      key: "message",
      type: "textarea",
      name: "message",
      placeholder: (active) =>
        active
          ? "Type your message and press Enter to send"
          : "Type your message here...",
      disabled: currentField !== "message",
    },
  ];

  return (
    <>
      <motion.div
        variants={panel}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-lg p-5 sm:p-8 md:p-10"
      >
        <motion.p
          variants={item}
          className="text-center text-[13px] tracking-[0.35em] text-white/50 uppercase"
        >
          Get in <span className="text-accent">touch</span>
        </motion.p>

        <motion.h1
          variants={item}
          className="text-center font-serif text-3xl sm:text-4xl md:text-5xl"
        >
          <span className="text-white">Write </span>
          <span className="text-accent italic">us</span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mx-auto mt-4 flex max-w-xs justify-center gap-2 sm:mt-5"
        >
          {FIELDS.map((field) => {
            const reached = fieldVisible(currentField, field);
            const active = currentField === field;
            return (
              <motion.span
                key={field}
                initial={{ scaleX: 0.35 }}
                animate={{ scaleX: reached ? 1 : 0.35 }}
                transition={{ duration: 0.35 }}
                className={`inline-block h-0.5 w-10 origin-center rounded-full ${
                  active ? "bg-accent" : reached ? "bg-white/60" : "bg-white/15"
                }`}
              />
            );
          })}
        </motion.div>

        <form
          className="mt-6 space-y-3 sm:mt-8 sm:space-y-4"
          onSubmit={handleFormSubmit}
        >
          <AnimatePresence initial={false}>
            {fields.map(({ key, type, name, placeholder, disabled }) =>
              fieldVisible(currentField, key) ? (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {type === "textarea" ? (
                    <textarea
                      ref={messageInputRef}
                      name={name}
                      rows={5}
                      value={formData[name]}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, key)}
                      disabled={disabled}
                      placeholder={placeholder(currentField === key)}
                      className={`${inputClass(key, currentField)} resize-none`}
                    />
                  ) : (
                    <input
                      ref={refs[key]}
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      onKeyDown={(e) => handleKeyDown(e, key)}
                      autoFocus={key === "name"}
                      disabled={disabled}
                      placeholder={placeholder(currentField === key)}
                      className={inputClass(key, currentField)}
                    />
                  )}
                </motion.div>
              ) : null,
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      <AnimatePresence>
        {submitState !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 backdrop-blur-[2px]"
            onClick={submitState !== "sending" ? closeOverlay : undefined}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-sm px-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {submitState === "sending" && (
                <>
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: -12 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 0.9,
                    }}
                    className="mb-4 text-accent"
                  >
                    <MailIcon />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="font-serif text-sm text-white italic sm:text-base"
                  >
                    Sending your{" "}
                    <span className="text-accent not-italic">message</span>...
                  </motion.p>
                </>
              )}

              {submitState === "success" && (
                <>
                  <p className="font-serif text-2xl text-accent italic">Sent</p>
                  <p className="mt-3 text-sm text-white/80">
                    Thank you — we&apos;ll be in touch soon.
                  </p>
                  <button
                    type="button"
                    onClick={closeOverlay}
                    className="mt-6 border border-white/30 px-5 py-2 text-[10px] tracking-[0.25em] text-white uppercase transition-colors hover:border-accent"
                  >
                    Close
                  </button>
                </>
              )}

              {submitState === "error" && (
                <>
                  <p className="font-serif text-2xl text-accent italic">
                    Couldn&apos;t send
                  </p>
                  <p className="mt-3 text-sm text-white/80">{submitError}</p>
                  <button
                    type="button"
                    onClick={closeOverlay}
                    className="mt-6 border border-white/30 px-5 py-2 text-[10px] tracking-[0.25em] text-white uppercase transition-colors hover:border-accent"
                  >
                    Try again
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function ContactPage() {
  const location = useLocation();
  const prefilledMessage = location.state?.message ?? "";

  return (
    <PageShell className="bg-black">
      <BackgroundImage
        src={PAGE_BACKGROUNDS.contact}
        overlayClass="bg-black/55"
        priority
        width={1920}
        height={1280}
      />
      <div
        className="absolute inset-0 z-1 bg-black/20 backdrop-blur-[2px]"
        aria-hidden
      />
      <Header />
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-16 pt-24 sm:pt-28 md:pt-24">
        <ContactForm key={location.key} prefilledMessage={prefilledMessage} />
      </div>
    </PageShell>
  );
}
