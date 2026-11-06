import AppLayout from "../components/navket";
import Hero from "../components/Hero";
import About from "../components/About";
import Motpr from "../components/Motpr";
import Agenda from "../components/Agenda";
import InteractiveHub from "../components/sectio";
import Filieres from "../components/Filieres";
import Stats from "../components/Stats";
import Gallery from "../components/Gallery";
import TestimonialsSection from "../components/TestimonialsSection";

import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function App() {
  return (
    <div className="font-body text-ink antialiased">
      <AppLayout />
      <Hero />
      <About />
      <Motpr />
      <Agenda />
      <InteractiveHub />
      <Filieres />
      <Stats />
      <Gallery />
      <TestimonialsSection />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}