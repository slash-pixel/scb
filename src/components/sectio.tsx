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
  // Événements
  PartyPopper, Cake, BookCheck,
  // UI
  ChevronRight
} from "lucide-react";

const TABS_DATA = [
  {
    id: "pratique",
    label: "Informations pratiques",
    category: "Pratique",
    title: "Tout ce que vous devez savoir",
    bgGradient: "from-amber-100/90 via-stone-100 to-orange-100/90",
    badgeStyle: "bg-amber-900/10 text-amber-950",
    titleColor: "text-amber-950",
    cardBorder: "border-amber-900/10 hover:border-amber-900/30",
    cardShadow: "hover:shadow-amber-900/10",
    iconBox: "bg-amber-200/60 text-amber-900 group-hover:bg-amber-900 group-hover:text-amber-200",
    ctaColor: "text-amber-900 group-hover:text-amber-700",
    cards: [
      { id: "h1", title: "Horaires administration et cours", desc: "Lundi–Vendredi : 7h30–16h00\n Samedi : 7h30–12h30\n Bureaux uniquement sur rendez-vous", icon: Clock },
      { id: "h2", title: "Cantine Scolaire", desc: "Repas équilibrés servis tous les jours. Service de 10h00 à 10h30 puis de 12h30 à 13h00.", icon: Utensils },
      { id: "h3", title: "Transport Scolaire", desc: "Pas encore actif mais en cours de réalisation", icon: Bus },
      { id: "h4", title: "Localisation", desc: "Ndogsimbi, Douala · Cameroun\nPrès de l'Institut Panafricain pour le Développement\nParking visiteurs disponible", icon: MapPin },
    ],
  },
  {
    id: "vie-scolaire",
    label: "Vie scolaire",
    category: "Vie Scolaire",
    title: "Au cœur de l'établissement",
    bgGradient: "from-emerald-100/80 via-stone-100 to-teal-100/80",
    badgeStyle: "bg-emerald-950/10 text-emerald-950",
    titleColor: "text-emerald-950",
    cardBorder: "border-emerald-900/10 hover:border-emerald-900/30",
    cardShadow: "hover:shadow-emerald-900/10",
    iconBox: "bg-emerald-200/60 text-emerald-900 group-hover:bg-emerald-900 group-hover:text-emerald-200",
    ctaColor: "text-emerald-900 group-hover:text-emerald-700",
    cards: [
      { id: "v1", title: "Corps Enseignant", desc: "85 professeurs qualifiés et passionnés. Un accompagnement personnalisé pour chaque élève, de la 6ème à la Terminale.", icon: Users },
      { id: "v2", title: "Règlement Intérieur", desc: "Un environnement bienveillant mais structuré pour favoriser l'épanouissement de tous. Consultez le règlement en vigueur.", icon: BookOpenCheck },
      { id: "v3", title: "Filières & Options", desc: "Séries Scientifiques, Littéraires. Options : Anglais renforcé, Arts plastiques, Informatique.", icon: Compass },
      { id: "v4", title: "Pastorale Scolaire", desc: "Messes journalières, aumônerie scolaire, mouvement d'action catholique, catéchèse : au terme de trois ans d'initiations les étudiants reçoivent les sacrements. La foi au cœur de notre projet éducatif.", cta: "Programme pastoral", icon: Heart },
    ],
  },
  {
    id: "pedagogie",
    label: "Projets pédagogiques",
    category: "Pédagogie",
    title: "Projets et sorties scolaires",
    bgGradient: "from-rose-100/90 via-orange-100/70 to-amber-100/90",
    badgeStyle: "bg-rose-950/10 text-rose-950",
    titleColor: "text-rose-950",
    cardBorder: "border-rose-900/10 hover:border-rose-900/30",
    cardShadow: "hover:shadow-rose-900/10",
    iconBox: "bg-rose-200/60 text-rose-900 group-hover:bg-rose-900 group-hover:text-rose-100",
    ctaColor: "text-rose-900 group-hover:text-rose-700",
    cards: [
      { id: "p1", title: "Club Sciences", desc: "Expériences en laboratoire, participation aux olympiades de mathématiques et de chimie au niveau national.", icon: TestTubeDiagonal },
      { id: "p2", title: "Arts et Culture", desc: "Théâtre scolaire, chorale, expositions artistiques annuelles. Le talent de chaque élève mis en lumière.", icon: Palette },
      { id: "p3", title: "Sorties pédagogiques", desc: "Visites muséales à Yaoundé, sorties écologiques au Mont Cameroun, échanges scolaires inter-établissements.", icon: Map },
      { id: "p4", title: "Numérique éducatif", desc: "Salle informatique équipée de 40 postes. Initiation au code, tablettes numériques en classe de Seconde.", icon: MonitorSmartphone },
    ],
  },
  {
    id: "espace-prive",
    label: "Espace élèves/parents",
    category: "Espace Privé",
    title: "Portail élèves & parents",
    bgGradient: "from-purple-100/90 via-slate-100 to-indigo-100/90",
    badgeStyle: "bg-purple-950/10 text-purple-950",
    titleColor: "text-purple-950",
    cardBorder: "border-purple-900/10 hover:border-purple-900/30",
    cardShadow: "hover:shadow-purple-900/10",
    iconBox: "bg-purple-200/60 text-purple-900 group-hover:bg-purple-900 group-hover:text-purple-100",
    ctaColor: "text-purple-900 group-hover:text-purple-700",
    cards: [
      { id: "e1", title: "Bulletins en ligne", desc: "Consultez les notes et bulletins trimestriels de votre enfant en temps réel sur notre plateforme sécurisée.", icon: GraduationCap },
      { id: "e2", title: "Messagerie", desc: "Communication directe avec les enseignants et l'administration. Suivi des absences et justificatifs en ligne.", icon: Mail },
      { id: "e3", title: "Devoirs en ligne", desc: "Accès aux devoirs, exercices supplémentaires et ressources pédagogiques déposés par les professeurs.", icon: BookMarked },
      { id: "e4", title: "Paiement scolarité", desc: "Règlement des frais de scolarité en ligne, suivi des paiements et téléchargement des reçus.", icon: CreditCard },
    ],
  },
  {
    id: "evenements",
    label: "Événements",
    category: "Événements",
    title: "Temps forts & Rassemblements",
    // Juste un tout petit peu plus vivant que le pastel pur, tout en restant très doux
    bgGradient: "from-amber-200/85 via-yellow-100/90 to-orange-200/85",
    badgeStyle: "bg-amber-950/10 text-amber-950 font-medium",
    titleColor: "text-amber-950",
    cardBorder: "border-amber-900/15 hover:border-amber-900/30",
    cardShadow: "hover:shadow-amber-900/10",
    iconBox: "bg-amber-200/80 text-amber-950 group-hover:bg-amber-900 group-hover:text-amber-200",
    ctaColor: "text-amber-900 group-hover:text-amber-700",
    cards: [
      { 
        id: "ev1", 
        title: "Mariages & Réceptions", 
        desc: "Organisation de vins d'honneur, repas et réceptions de mariage dans un cadre sécurisé, spacieux et adapté.", 
        icon: PartyPopper 
      },
      { 
        id: "ev2", 
        title: "Anniversaires", 
        desc: "Accueil de fêtes d'anniversaire et de célébrations familiales pendant les week-ends et périodes de vacances.", 
        icon: Cake 
      },
      { 
        id: "ev3", 
        title: "Centre d'Examen OBC", 
        desc: "Sous-centre officiel agréé par l'Office du Baccalauréat du Cameroun pour le déroulement des épreuves du Probatoire.", 
        icon: BookCheck 
      }
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
              <span className={`inline-block px-3 py-1 rounded-full font-mono text-xs tracking-[0.2em] uppercase mb-4 shadow-sm ${activeTab.badgeStyle}`}>
                {activeTab.category}
              </span>
              <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight ${activeTab.titleColor}`}>
                {activeTab.title}
              </h2>
            </div>

            {/* Grille des cartes avec adaptation dynamique du nombre de colonnes */}
            <div 
              className={`grid sm:grid-cols-2 gap-6 ${
                activeTab.cards.length === 3 
                  ? "lg:grid-cols-3 max-w-5xl mx-auto" 
                  : "lg:grid-cols-4" 
              }`}
            >
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

                    {/* Point focal spécifique : "Programme pastoral" en rouge */}
                    {card.cta === "Programme pastoral" && (
                      <div className="mt-8 pt-4 border-t border-red-100">
                        <button className="inline-flex items-center gap-2 text-xs font-bold text-red-700 transition-colors hover:text-red-950">
                          <span>{card.cta}</span>
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    )}
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