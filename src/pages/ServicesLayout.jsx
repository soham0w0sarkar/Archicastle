import { Outlet, useMatch } from "react-router-dom";
import AnimatedBlueprintGrid from "../components/AnimatedBlueprintGrid";
import BackgroundVideo from "../components/BackgroundVideo";
import Header from "../components/Header";
import PageShell from "../components/PageShell";
import { SERVICES_VIDEO } from "../data/servicesVideo";

export default function ServicesLayout() {
  const isDetail = Boolean(useMatch("/services/:slug"));

  return (
    <PageShell
      className="bg-black"
      sectionClassName={isDetail ? "page-section-fit" : ""}
    >
      <BackgroundVideo
        mp4={SERVICES_VIDEO.mp4}
        webm={SERVICES_VIDEO.webm}
        poster={SERVICES_VIDEO.poster}
        overlayClass="bg-black/40 backdrop-blur-sm"
        videoClass=""
        playbackRate={SERVICES_VIDEO.playbackRate}
      />

      {isDetail && (
        <div className="absolute inset-0 z-1 border border-white/10 bg-black/40 backdrop-blur-[2px]">
          <AnimatedBlueprintGrid />
        </div>
      )}

      <Header />

      <Outlet />
    </PageShell>
  );
}
