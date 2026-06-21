import Footer from "./Footer";

export default function PageShell({
  children,
  className = "",
  sectionClassName = "",
  hideFooter = false,
}) {
  return (
    <div className={`flex min-h-dvh flex-col ${className}`}>
      <section className={`page-section ${sectionClassName}`.trim()}>
        {children}
        {!hideFooter && <Footer />}
      </section>
    </div>
  );
}
