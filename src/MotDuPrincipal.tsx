import { motion } from "motion/react";
import { Quote, CalendarDays } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Données fictives pour les anciens principaux (À modifier avec tes vraies informations)
const ANCIENS_PRINCIPAUX = [
  {
    id: 1,
    nom: "M. Paul Biya",
    debut: "2015",
    fin: "2020",
    image: "/images/ancien-1.jpg",
  },
  {
    id: 2,
    nom: "Mme. Marie Ndiaye",
    debut: "2010",
    fin: "2015",
    image: "/images/ancien-2.jpg",
  },
  {
    id: 3,
    nom: "Père Jacques Lemaire",
    debut: "2002",
    fin: "2010",
    image: "/images/ancien-3.jpg",
  },
  {
    id: 4,
    nom: "M. Robert Kamga",
    debut: "1995",
    fin: "2002",
    image: "/images/ancien-4.jpg",
  }
];

export default function MotDuPrincipal() {
  return (
    <div className="flex flex-col min-h-screen bg-paper">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-6 lg:px-10 max-w-7xl mx-auto w-full">
        
        {/* =========================================
            SECTION 1 : LE PRINCIPAL ACTUEL
        ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Photo du principal actuel (Gauche) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col items-center lg:items-start lg:sticky lg:top-32"
          >
            <div className="relative w-64 h-80 lg:w-full lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl mb-6">
              {/* Remplace par la vraie photo du principal actuel */}
              <img 
                src="/images/principal-actuel.jpg" 
                alt="Principal actuel du Collège" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-4 border-gold/40 rounded-2xl pointer-events-none"></div>
            </div>
            <div className="text-center lg:text-left w-full">
              <h2 className="text-2xl font-display font-bold text-navy-deep">M. Jean Dupont</h2>
              <p className="text-gold font-semibold uppercase tracking-wider text-sm mt-1">
                Principal en exercice (2020 - Présent)
              </p>
            </div>
          </motion.div>

          {/* Texte du mot du principal (Droite) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-8 bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 relative"
          >
            <Quote className="absolute top-8 right-8 w-16 h-16 text-gold/10 rotate-180" />

            <h1 className="text-3xl md:text-4xl font-display font-bold text-navy-deep mb-8 relative z-10">
              Le Mot du Principal
            </h1>

            <div className="space-y-6 text-gray-700 leading-relaxed relative z-10 text-justify">
              <p className="font-semibold text-lg text-navy-deep">
                Chers parents, chers élèves, chers partenaires éducatifs,
              </p>
              
              <p>
                C'est avec une immense fierté et un profond sens des responsabilités que je vous souhaite la bienvenue sur le portail numérique du Collège Catholique Saint Charles Borromée. Notre établissement n'est pas seulement un lieu de transmission du savoir, c'est un véritable milieu de vie où se forgent les adultes de demain.
              </p>

              <p>
                Fondé sur des valeurs chrétiennes d'amour, de discipline et de travail, notre collège s'engage à offrir un encadrement rigoureux et bienveillant. Nous croyons fermement que chaque enfant qui franchit nos portes possède un potentiel unique qui ne demande qu'à être éveillé.
              </p>

              <p>
                Face aux défis du monde contemporain, notre mission est double : garantir l'excellence académique tout en assurant la formation morale et spirituelle de nos apprenants. Notre équipe pédagogique met tout en œuvre pour accompagner vos enfants vers la réussite.
              </p>

              <p className="font-semibold text-navy-deep pt-4">
                Que Dieu bénisse notre année scolaire et qu'Il protège notre belle communauté éducative.
              </p>
            </div>
          </motion.div>
        </div>

        {/* =========================================
            SECTION 2 : HISTORIQUE DES ANCIENS
        ========================================= */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="border-t border-gray-200 pt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-navy-deep mb-4">
              Ils ont dirigé notre établissement
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hommage à nos anciens principaux qui ont bâti, par leur dévouement et leur vision, 
              le prestige et l'excellence du Collège Catholique Saint Charles Borromée au fil des décennies.
            </p>
          </div>

          {/* Grille des anciens principaux */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ANCIENS_PRINCIPAUX.map((ancien, index) => (
              <motion.div
                key={ancien.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-xl transition-shadow duration-300 group"
              >
                {/* Photo de l'ancien principal */}
                <div className="aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <img 
                    src={ancien.image} 
                    alt={ancien.nom}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    // Si l'image ne charge pas, on affiche un fond gris à la place
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=Photo+non+disponible';
                    }}
                  />
                </div>
                
                {/* Infos */}
                <div className="text-center">
                  <h3 className="font-bold text-navy-deep text-lg mb-1">{ancien.nom}</h3>
                  <div className="flex items-center justify-center gap-1.5 text-gold text-sm font-semibold">
                    <CalendarDays className="w-4 h-4" />
                    <span>{ancien.debut} - {ancien.fin}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </main>

      <Footer />
    </div>
  );
}