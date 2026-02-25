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

function App() {
  return (
    <AppProvider>
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
    </AppProvider>
  );
}

export default App;
