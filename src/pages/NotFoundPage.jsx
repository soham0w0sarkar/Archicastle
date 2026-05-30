import AnimatedBlueprintGrid from "../components/AnimatedBlueprintGrid";
import Header from "../components/Header";
import NotFoundContent from "../components/NotFoundContent";
import PageShell from "../components/PageShell";

export default function NotFoundPage() {
  return (
    <PageShell className="bg-black" sectionClassName="page-section-fit">
      <div className="absolute inset-0 z-0 bg-black" />

      <div className="absolute inset-0 z-1 border border-white/10 bg-black/50 backdrop-blur-[2px]">
        <AnimatedBlueprintGrid />
      </div>

      <Header />

      <main className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-8 pt-28 sm:px-6 sm:pt-32 md:px-10 lg:px-12">
        <NotFoundContent />
      </main>
    </PageShell>
  );
}
