import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  // Pratique
  Clock, Utensils, Bus, MapPin,
  // Vie Scolaire
  Users, BookOpenCheck, Compass, Heart,
  // Pédagogie
  TestTubeDiagonal, Palette, Map, MonitorSmartphone,
  // Espace Privé
  GraduationCap, Mail, BookMarked, CreditCard,
  // UI
  ChevronRight
} from "lucide-react";

const TABS_DATA = [
  {
    id: "pratique",
    label: "Informations pratiques",
    category: "Pratique",
    title: "Tout ce que vous devez savoir",
    // Palette 1 : Ambre & Sable Chaud
    bgGradient: "from-amber-100/90 via-stone-100 to-orange-100/90",
    badgeStyle: "bg-amber-900/10 text-amber-950",
    titleColor: "text-amber-950",
    cardBorder: "border-amber-900/10 hover:border-amber-900/30",
    cardShadow: "hover:shadow-amber-900/10",
    iconBox: "bg-amber-200/60 text-amber-900 group-hover:bg-amber-900 group-hover:text-amber-200",
    ctaColor: "text-amber-900 group-hover:text-amber-700",
    cards: [
      { id: "h1", title: "Horaires", desc: "Lundi–Vendredi : 7h30–16h00\nSamedi : 7h30–12h30\nBureaux sur rendez-vous", cta: "Voir les détails", icon: Clock },
      { id: "h2", title: "Cantine Scolaire", desc: "Repas équilibrés servis tous les jours. Menu hebdomadaire publié chaque vendredi. Service de 12h00 à 13h30.", cta: "Voir les menus", icon: Utensils },
      { id: "h3", title: "Transport Scolaire", desc: "Service de bus couvrant les principaux quartiers de Douala. Ramassage dès 6h45. Tarifs sur demande.", cta: "Voir les trajets", icon: Bus },
      { id: "h4", title: "Localisation", desc: "Akwa, Douala · Cameroun\nPrès du Rond-point Deido\nParking visiteurs disponible", cta: "Itinéraires", icon: MapPin },
    ],
  },
  {
    id: "vie-scolaire",
    label: "Vie scolaire",
    category: "Vie Scolaire",
    title: "Au cœur de l'établissement",
    // Palette 2 : Vert Sauge & Menthe Profonde
    bgGradient: "from-emerald-100/80 via-stone-100 to-teal-100/80",
    badgeStyle: "bg-emerald-950/10 text-emerald-950",
    titleColor: "text-emerald-950",
    cardBorder: "border-emerald-900/10 hover:border-emerald-900/30",
    cardShadow: "hover:shadow-emerald-900/10",
    iconBox: "bg-emerald-200/60 text-emerald-900 group-hover:bg-emerald-900 group-hover:text-emerald-200",
    ctaColor: "text-emerald-900 group-hover:text-emerald-700",
    cards: [
      { id: "v1", title: "Corps Enseignant", desc: "85 professeurs qualifiés et passionnés. Un accompagnement personnalisé pour chaque élève, de la 6ème à la Terminale.", cta: "Découvrir l'équipe", icon: Users },
      { id: "v2", title: "Règlement Intérieur", desc: "Un environnement bienveillant mais structuré pour favoriser l'épanouissement de tous. Consultez le règlement en vigueur.", cta: "Télécharger", icon: BookOpenCheck },
      { id: "v3", title: "Filières & Options", desc: "Séries Scientifiques, Littéraires et Économiques. Options : Anglais renforcé, Arts plastiques, Informatique.", cta: "Explorer les filières", icon: Compass },
      { id: "v4", title: "Pastorale Scolaire", desc: "Messes mensuelles, retraites spirituelles, groupes de prière. La foi au cœur de notre projet éducatif.", cta: "Programme pastoral", icon: Heart },
    ],
  },
  {
    id: "pedagogie",
    label: "Projets pédagogiques",
    category: "Pédagogie",
    title: "Projets et sorties scolaires",
    // Palette 3 : Terracotta & Corail Doux
    bgGradient: "from-rose-100/90 via-orange-100/70 to-amber-100/90",
    badgeStyle: "bg-rose-950/10 text-rose-950",
    titleColor: "text-rose-950",
    cardBorder: "border-rose-900/10 hover:border-rose-900/30",
    cardShadow: "hover:shadow-rose-900/10",
    iconBox: "bg-rose-200/60 text-rose-900 group-hover:bg-rose-900 group-hover:text-rose-100",
    ctaColor: "text-rose-900 group-hover:text-rose-700",
    cards: [
      { id: "p1", title: "Club Sciences", desc: "Expériences en laboratoire, participation aux olympiades de mathématiques et de chimie au niveau national.", cta: "En savoir plus", icon: TestTubeDiagonal },
      { id: "p2", title: "Arts et Culture", desc: "Théâtre scolaire, chorale, expositions artistiques annuelles. Le talent de chaque élève mis en lumière.", cta: "Voir le programme", icon: Palette },
      { id: "p3", title: "Sorties pédagogiques", desc: "Visites muséales à Yaoundé, sorties écologiques au Mont Cameroun, échanges scolaires inter-établissements.", cta: "Calendrier", icon: Map },
      { id: "p4", title: "Numérique éducatif", desc: "Salle informatique équipée de 40 postes. Initiation au code, tablettes numériques en classe de Seconde.", cta: "Voir l'équipement", icon: MonitorSmartphone },
    ],
  },
  {
    id: "espace-prive",
    label: "Espace élèves/parents",
    category: "Espace Privé",
    title: "Portail élèves & parents",
    // Palette 4 : Prune, Violet & Lavande
    bgGradient: "from-purple-100/90 via-slate-100 to-indigo-100/90",
    badgeStyle: "bg-purple-950/10 text-purple-950",
    titleColor: "text-purple-950",
    cardBorder: "border-purple-900/10 hover:border-purple-900/30",
    cardShadow: "hover:shadow-purple-900/10",
    iconBox: "bg-purple-200/60 text-purple-900 group-hover:bg-purple-900 group-hover:text-purple-100",
    ctaColor: "text-purple-900 group-hover:text-purple-700",
    cards: [
      { id: "e1", title: "Bulletins en ligne", desc: "Consultez les notes et bulletins trimestriels de votre enfant en temps réel sur notre plateforme sécurisée.", cta: "Se connecter", icon: GraduationCap },
      { id: "e2", title: "Messagerie", desc: "Communication directe avec les enseignants et l'administration. Suivi des absences et justificatifs en ligne.", cta: "Accéder", icon: Mail },
      { id: "e3", title: "Devoirs en ligne", desc: "Accès aux devoirs, exercices supplémentaires et ressources pédagogiques déposés par les professeurs.", cta: "Consulter", icon: BookMarked },
      { id: "e4", title: "Paiement scolarité", desc: "Règlement des frais de scolarité en ligne, suivi des paiements et téléchargement des reçus.", cta: "Gérer le compte", icon: CreditCard },
    ],
  },
];

export default function InteractiveHub() {
  const [activeTabId, setActiveTabId] = useState(TABS_DATA[0].id);
  const activeTab = TABS_DATA.find((t) => t.id === activeTabId)!;

  return (
    <section className="relative min-h-screen py-24 md:py-32 overflow-hidden border-t border-black/5">
      
      {/* Arrière-plan coloré dynamique */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeTab.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className={`absolute inset-0 z-0 bg-gradient-to-br ${activeTab.bgGradient}`}
        />
      </AnimatePresence>
      
      {/* Texture géométrique discrète */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 z-10">
        
        {/* Navigation des Onglets */}
        <div className="flex flex-wrap items-center justify-start md:justify-center gap-2 p-2 bg-white/80 backdrop-blur-md rounded-2xl border border-stone-300/50 shadow-md max-w-fit mx-auto mb-16">
          {TABS_DATA.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`relative px-5 py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-300 select-none ${
                  isActive ? "text-white" : "text-stone-700 hover:text-stone-950 hover:bg-black/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-stone-900 rounded-xl shadow-md"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Contenu changeant */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {/* En-tête de la section */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className={`inline-block px-3 py-1 rounded-full font-mono text-xs tracking-[0.2em] uppercase font-semibold mb-4 ${activeTab.badgeStyle}`}>
                {activeTab.category}
              </span>
              <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight ${activeTab.titleColor}`}>
                {activeTab.title}
              </h2>
            </div>

            {/* Grille des 4 cartes unifiées */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activeTab.cards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className={`group relative flex flex-col justify-between h-full rounded-3xl p-7 transition-all duration-300 bg-white/90 backdrop-blur-sm text-stone-900 border shadow-sm hover:shadow-xl ${activeTab.cardBorder} ${activeTab.cardShadow}`}
                  >
                    <div>
                      {/* Icône animée */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 ${activeTab.iconBox}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>

                      {/* Textes */}
                      <h3 className="font-display text-xl font-semibold mb-3 text-stone-900">
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed whitespace-pre-line text-stone-700 transition-colors duration-300">
                        {card.desc}
                      </p>
                    </div>

                    {/* Bouton d'action */}
                    <div className="mt-8 pt-4 border-t border-stone-200/80">
                      <button className={`inline-flex items-center gap-2 text-xs font-bold transition-all duration-300 ${activeTab.ctaColor}`}>
                        <span>{card.cta}</span>
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
        
      </div>
    </section>
  );
}