import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import MotDuPrincipal from "./MotDuPrincipal";
import Login from "./components/login";
import Form from "./components/form"; // Votre composant Form // Ajuste le chemin selon où tu l'as créé
import Home from "./Home";
import Recrutement from "./components/Recrutement";
import GalleryPage from "./GalleryPage"; // Importe ta nouvelle page
//import EspaceParent from "./EspaceParent";

export default function App() {
  return (
    <BrowserRouter>
      {/* On place le composant ici pour qu'il écoute toutes les routes */}
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recrutement" element={<Recrutement />} />
        <Route path="/galerie-interactive" element={<GalleryPage />} />
        <Route path="/mot-du-principal" element={<MotDuPrincipal />} />
        {/* <Route path="/espace-parent" element={<EspaceParent />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}