import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ServicesLayout from "./pages/ServicesLayout";
import ServicesPage from "./pages/ServicesPage";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || undefined}>
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
    </BrowserRouter>
  );
}
