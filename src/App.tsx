import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Filieres from "./components/Filieres";
import Stats from "./components/Stats";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Remarque : les sections "Actualités" et "Ordre du jour" ont volontairement
// été retirées de ce site, à ta demande.
export default function App() {
  return (
    <div className="font-body text-ink antialiased">
      <Navbar />
      <Hero />
      <About />
      <Filieres />
      <Stats />
      <Gallery />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
