import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Form from "./components/form";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Recrutement from "./components/Recrutement";
import GalleryPage from "./pages/GalleryPage";
import EspaceParentPage from "./pages/EspaceParent";

export default function App() {
  return (
    <BrowserRouter>
      {/* On place le composant ici pour qu'il écoute toutes les routes */}
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recrutement" element={<Recrutement />} />
        <Route path="/galerie-interactive" element={<GalleryPage />} />
        <Route path="/espace-parent" element={<EspaceParentPage />} />
        <Route path="/login-page" element={<LoginPage />} /> {/* Nouvelle route pour la page de connexion */}

        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}