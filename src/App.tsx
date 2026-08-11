
import AppLayout from "./components/navket";
import About from "./components/About";
import InteractiveHub from"./components/sectio";
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
      <AppLayout />
      <About />
      <InteractiveHub />
      <Filieres />
      <Stats />
      <Gallery />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
