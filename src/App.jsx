import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BackgroundPrefetcher from "./components/BackgroundPrefetcher";
import HomePage from "./pages/HomePage";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const ServicesLayout = lazy(() => import("./pages/ServicesLayout"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));

function PageLoader() {
  return <div className="min-h-dvh bg-black" aria-hidden />;
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}>
      <BackgroundPrefetcher />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesLayout />}>
            <Route index element={<ServicesPage />} />
            <Route
              path="modelling"
              element={<Navigate to="/services/bim" replace />}
            />
            <Route path=":slug" element={<ServiceDetailPage />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
