import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LogIn, Loader2 } from "lucide-react";
import Footer from "./components/Footer";

// Importations nécessaires pour la Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Définition du type pour une image provenant de l'API
interface APIImage {
  id: number;
  title: string;
  url: string;
  createdAt: string;
}

const API_BASE_URL = "https://scbapi.onrender.com";

export default function GalleryPage() {
  // État pour stocker les images venant de l'API
  const [images, setImages] = useState<APIImage[]>([]);
  // État de chargement
  const [isLoading, setIsLoading] = useState(true);
  // Gestion de l'état d'ouverture de la Lightbox (-1 = fermé, >= 0 = index de l'image ouverte)
  const [index, setIndex] = useState<number>(-1);

  // Fonction utilitaire robuste pour formater correctement l'URL (Cloudinary vs local)
  const getImageUrl = (url: string) => {
    if (!url) return "";

    // 1. URL standard absolue HTTP / HTTPS
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // 2. Erreur de formatage courante (ex: "https//res.cloudinary.com/...")
    if (url.startsWith("https//") || url.startsWith("http//")) {
      return url.replace(/^https?\/\//, "https://");
    }

    // 3. Domaine Cloudinary direct sans protocole (ex: "res.cloudinary.com/...")
    if (url.startsWith("res.cloudinary.com") || url.startsWith("//res.cloudinary.com")) {
      return `https://${url.replace(/^\/\//, "")}`;
    }

    // 4. Chemin relatif backend (ex: "/uploads/image.jpg")
    const cleanPath = url.startsWith("/") ? url : `/${url}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  // Utilisation de useEffect pour aller chercher les images au chargement de la page
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/images`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des images");
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Erreur Fetch:", error);
      } finally {
        setIsLoading(false); // Le chargement est terminé
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-paper">
      
      <main className="flex-grow pt-10 pb-16 px-6 lg:px-10 max-w-7xl mx-auto w-full">
        
        {/* EN-TÊTE : BOUTON RETOUR ET BOUTON LOGIN */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/#galerie"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy-deep transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Retour à l'accueil</span>
          </Link>

          {/* BOUTON LOGIN */}
          <Link
            to="/login"
            className="group inline-flex items-center gap-2 rounded-lg bg-navy-deep px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold hover:text-navy-deep"
          >
            <LogIn className="h-4 w-4" />
            <span>Se connecter</span>
          </Link>
        </div>

        <h1 className="text-4xl font-display font-bold text-ink mb-12">
          Galerie complète
        </h1>
        
        {/* AFFICHAGE CONDITIONNEL : CHARGEMENT OU GRILLE DES PHOTOS */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-navy/40 mb-4" />
            <p className="text-navy/60 font-medium">Chargement des photos...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-navy/10 rounded-2xl">
            <p className="text-navy/50 font-medium">Aucune photo n'est disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((photo, i) => (
              <div 
                key={photo.id} 
                onClick={() => setIndex(i)}
                className="aspect-square overflow-hidden rounded-xl bg-gray-200 cursor-pointer group relative"
              >
                <img 
                  src={getImageUrl(photo.url)} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay au survol */}
                <div className="absolute inset-0 bg-navy-deep/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-white font-semibold mb-2 drop-shadow-md">
                    {photo.title}
                  </span>
                  <span className="text-xs text-white bg-navy-deep/80 px-3 py-1.5 rounded-full font-medium">
                    Agrandir
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* LIGHTBOX (Affichage Plein Écran) */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // Formatage dynamique des URLs pour les slides Lightbox
        slides={images.map((p) => ({ 
          src: getImageUrl(p.url), 
          alt: p.title 
        }))}
      />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}