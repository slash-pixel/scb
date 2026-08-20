import Navbar from "../components/Navbar"; // Ajuste le chemin si nécessaire
import Footer from "../components/Footer"; // Ajuste le chemin si nécessaire
import ScrollReveal from "../components/ScrollReveal"; // Ajuste le chemin si nécessaire
import { Briefcase, Calendar, Mail, FileText } from "lucide-react";

export default function Recrutement() {
  return (
    <div className="min-h-screen flex flex-col bg-paper font-sans">
      {/* On inclut la Navbar en haut */}
      <Navbar />

      {/* Le contenu principal, on ajoute un padding-top pour ne pas être caché par la Navbar fixe */}
      <main className="flex-grow pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          
          <ScrollReveal className="text-center mb-12">
            <p className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-navy/75 mb-4">
              Carrières
            </p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-navy-deep leading-tight mb-6">
              Rejoignez le Collège Catholique <br className="hidden md:block" />
              Saint Charles Borromée
            </h1>
            <p className="text-navy/70 max-w-2xl mx-auto text-base md:text-lg">
              Nous sommes à la recherche de profils passionnés et compétents pour contribuer à notre mission éducative : <span className="italic font-medium">"Former des esprits, éduquer des cœurs, construire l'excellence."</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="bg-white p-4 md:p-8 rounded-2xl shadow-xl border border-navy/5">
            
            {/* L'image de l'appel à candidature */}
            <div className="relative rounded-xl overflow-hidden shadow-md border border-gray-100 bg-gray-50 flex justify-center">
              <img 
                src="/WhatsApp Image 2026-08-14 at 09.38.45.jpeg" 
                alt="Appel à candidature : Secrétaire de Direction" 
                className="w-full max-w-3xl h-auto object-contain"
                loading="eager"
              />
            </div>

            {/* Section Informations Pratiques (Extraites de l'image pour le confort de l'utilisateur) */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              
              <div className="flex flex-col items-center md:items-start p-4 bg-navy-deep/5 rounded-xl transition-colors hover:bg-navy-deep/10">
                <Briefcase className="w-6 h-6 text-navy-deep mb-3" />
                <h3 className="text-xs uppercase tracking-wider font-bold text-navy-deep/70 mb-1">Poste</h3>
                <p className="font-medium text-navy-deep text-center md:text-left">Secrétaire de Direction</p>
              </div>
              
              <div className="flex flex-col items-center md:items-start p-4 bg-navy-deep/5 rounded-xl transition-colors hover:bg-navy-deep/10">
                <Calendar className="w-6 h-6 text-navy-deep mb-3" />
                <h3 className="text-xs uppercase tracking-wider font-bold text-navy-deep/70 mb-1">Date limite</h3>
                <p className="font-medium text-navy-deep text-center md:text-left">21 août 2026</p>
              </div>

              <div className="flex flex-col items-center md:items-start p-4 bg-navy-deep/5 rounded-xl transition-colors hover:bg-navy-deep/10">
                <FileText className="w-6 h-6 text-navy-deep mb-3" />
                <h3 className="text-xs uppercase tracking-wider font-bold text-navy-deep/70 mb-1">Dossier</h3>
                <p className="font-medium text-navy-deep text-sm text-center md:text-left">CV, Motivation, Diplôme, Justificatifs</p>
              </div>

              {/* Bouton d'action (Call to Action) */}
              <div className="flex flex-col justify-center mt-4 md:mt-0">
                <a 
                  href="mailto:borromeecol@yahoo.com?subject=Candidature%20au%20poste%20de%20Secrétaire%20de%20Direction"
                  className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-navy-deep px-6 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-gold hover:text-navy-deep hover:shadow-xl w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Mail className="w-4 h-4" />
                  <span>Postuler par email</span>
                  {/* Effet lumineux au survol */}
                  <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </a>
              </div>

            </div>
          </ScrollReveal>
          
        </div>
      </main>

      {/* On inclut le Footer en bas */}
      <Footer />
    </div>
  );
}