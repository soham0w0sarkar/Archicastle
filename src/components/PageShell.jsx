import Footer from "./Footer";

export default function PageShell({
  children,
  className = "",
  sectionClassName = "",
}) {
  return (
    <div className={`flex min-h-dvh flex-col ${className}`}>
      <section className={`page-section ${sectionClassName}`.trim()}>
        {children}
        <Footer />
      </section>
    </div>
  );
}
