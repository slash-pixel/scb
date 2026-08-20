import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Footer from "./components/Footer";

// Importations nécessaires pour la Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const TOUTES_LES_PHOTOS = [
  { src: "/galerie/campus-1.jpg", alt: "" },
  { src: "/galerie/classe-1.jpg", alt: "" },
  { src: "/galerie/rassemblement.jpg", alt: "" },
  { src: "/galerie/evenement-1.jpg", alt: "" },
  { src: "/galerie/excellence.jpg", alt: "" },
  { src: "/galerie/ev2.JPG", alt: "" },
  { src: "/galerie/ev1.JPG", alt: "" },
  { src: "/galerie/ev3.JPG", alt: "" },
  { src: "/galerie/ev4.JPG", alt: "" },
  { src: "/galerie/ev5.JPG", alt: "" },
  { src: "/galerie/ev9.JPG", alt: "" },
  { src: "/galerie/ev10.JPG", alt: "" },
  { src: "/galerie/ph1.JPG", alt: "" },
  { src: "/galerie/ph2.JPG", alt: "" },
  { src: "/galerie/lnd1.jpg", alt: "" },
  { src: "/galerie/lnd2.jpg", alt: "" },
  { src: "/galerie/lnd3.jpg", alt: "" },
  { src: "/galerie/DSC_6141.JPG", alt: "" },
  { src: "/galerie/DSC_6145.JPG", alt: "" },
];

export default function GalleryPage() {
  // Gestion de l'état d'ouverture (-1 = fermé, >= 0 = index de l'image ouverte)
  const [index, setIndex] = useState<number>(-1);

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      
      <main className="flex-grow pt-10 pb-16 px-6 lg:px-10 max-w-7xl mx-auto w-full">
        
        {/* BOUTON RETOUR EN HAUT */}
        <div className="mb-8">
          <Link
            to="/#galerie"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-deep transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>

        <h1 className="text-4xl font-display font-bold text-ink mb-12">
          Galerie complète
        </h1>
        
        {/* GRILLE DES PHOTOS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {TOUTES_LES_PHOTOS.map((photo, i) => (
            <div 
              key={i} 
              onClick={() => setIndex(i)} // Ouvre l'image sélectionnée
              className="aspect-square overflow-hidden rounded-xl bg-gray-200 cursor-pointer group relative"
            >
              <img 
                src={photo.src} 
                alt={photo.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay au survol */}
              <div className="absolute inset-0 bg-navy-deep/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-xs text-white bg-navy-deep/80 px-3 py-1.5 rounded-full font-medium">
                  Agrandir
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* LIGHTBOX (Affichage Plein Écran) */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={TOUTES_LES_PHOTOS.map((p) => ({ src: p.src, alt: p.alt }))}
      />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}