import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchFilter from "./components/SearchFilter";
import DiscoverCities from "./components/DiscoverCities";
import PropertyGrid from "./components/PropertyGrid";
import MapSection from "./components/MapSection";
import Testimonials from "./components/Testimonials";
import TestimonialCarousel from "./components/TestimonialCarousel";
import CtaBanner from "./components/CtaBanner";
import Footer from "./components/Footer";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";

/* ── Home Page ── */
function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SearchFilter />
        <DiscoverCities />
        <PropertyGrid />
        <MapSection />
        <TestimonialCarousel />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
