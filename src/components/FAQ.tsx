import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Mail } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import Crest from "./Crest";

interface Tableau {
  colonnes: string[];
  lignes: string[][];
  note?: string;
}

interface FaqItem {
  question: string;
  reponse: string;
  tableau?: Tableau;
}

const FAQS: FaqItem[] = [
  {
    question: "Comment inscrire mon enfant au collège ?",
    reponse:
      "Les inscriptions se font directement au secrétariat du collège, généralement entre juillet et septembre pour la rentrée. Selon la classe visée, un test de niveau ou un entretien peut être organisé. Nous te conseillons de prendre rendez-vous au préalable via la section Contact ci-dessous.",
  },
  {
    question: "Quels documents sont nécessaires pour le dossier d'inscription ?",
    reponse:
      "En général : extrait de naissance, bulletins ou relevés de notes de l'année précédente, un certificat médical, des photos d'identité et les frais de dossier. La liste exacte est confirmée au secrétariat au moment de l'inscription, car elle peut varier selon la classe.",
  },
  {
    question: "Comment les élèves sont-ils encadrés au quotidien ?",
    reponse:
      "Chaque classe bénéficie d'un suivi de proximité : équipe de vie scolaire présente au quotidien, bulletins réguliers, et échanges directs avec les familles en cas de besoin. L'encadrement combine exigence académique et accompagnement humain, dans l'esprit des valeurs chrétiennes du collège.",
  },
  {
    question: "Quels sont les frais de scolarité ?",
    reponse:
      "Les frais varient selon la classe et la filière (générale ou technique commerciale). Pour obtenir la grille tarifaire à jour, le plus fiable est de contacter directement le secrétariat — voir la section Contact.",
  },
  {
    question: "Le collège propose-t-il une cantine et un transport scolaire ?",
    reponse:
      "Selon les disponibilités de l'année en cours, une restauration sur place et des solutions de transport peuvent être proposées. Contacte le secrétariat pour connaître l'offre actuelle et les modalités d'inscription à ces services.",
  },
  {
    question: "Quels sont les horaires de cours ?",
    reponse:
      "Les cours se déroulent du lundi au vendredi, en journée continue ou avec une pause méridienne selon le niveau. Les horaires précis sont communiqués à la rentrée et peuvent varier légèrement d'une classe à l'autre.",
  },
  {
    question:
      "Quand ont lieu les examens nationaux (BEPC, CAP, Probatoire, Baccalauréat) ?",
    reponse:
      "Ces examens sont organisés chaque année par le MINESEC et l'Office du Baccalauréat du Cameroun (OBC), généralement entre mai et juillet. À titre de référence, voici le calendrier de la session 2026 :",
    tableau: {
      colonnes: ["Examen", "Épreuves écrites", "Résultats"],
      lignes: [
        ["Baccalauréat", "25 – 30 mai 2026", "Mi-juillet 2026"],
        ["Probatoire", "8 – 12 juin 2026", "Fin juillet 2026"],
        ["BEPC", "2 – 5 juin 2026", "À partir du 6 juillet 2026"],
        ["CAP", "2 – 5 juin 2026", "À partir du 6 juillet 2026"],
      ],
      note:
        "Calendrier officiel republié chaque année par le MINESEC et l'OBC — vérifie les dates exactes de la session en cours auprès du secrétariat ou sur officedubac.cm.",
    },
  },
  {
    question: "Quand sont les vacances scolaires ?",
    reponse:
      "Le calendrier scolaire est fixé chaque année par arrêté conjoint du MINESEC et du MINEDUB. À titre de référence, voici les périodes de l'année scolaire 2025–2026 :",
    tableau: {
      colonnes: ["Période", "Dates"],
      lignes: [
        ["Rentrée scolaire", "Lundi 8 septembre 2025"],
        ["Vacances de Noël", "19 déc. 2025 → 6 janv. 2026"],
        ["Vacances de Pâques", "2 avril → 20 avril 2026"],
        ["Fin d'année scolaire", "Vendredi 31 juillet 2026"],
      ],
      note:
        "Le calendrier 2026–2027 (rentrée prévue le 7 septembre 2026) est publié par le MINESEC/MINEDUB généralement fin août — à actualiser dès sa parution.",
    },
  },
];

function TableauFaq({ tableau }: { tableau: Tableau }) {
  return (
    <div className="mt-5">
      <div className="rounded-xl border border-navy/10 overflow-hidden bg-white shadow-sm shadow-navy/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-navy/10">
              {tableau.colonnes.map((col) => (
                <th
                  key={col}
                  className="font-mono text-[0.65rem] uppercase tracking-wide text-navy/70 px-5 py-3 font-semibold"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableau.lignes.map((ligne, index) => (
              <tr key={ligne[0]} className={index !== tableau.lignes.length - 1 ? "border-b border-navy/5" : ""}>
                <td className="px-5 py-3.5 text-sm font-semibold text-ink">{ligne[0]}</td>
                {ligne.slice(1).map((cellule, i) => (
                  <td key={i} className="px-5 py-3.5 font-mono text-xs text-ink-soft">
                    {cellule}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {tableau.note && (
        <p className="mt-3 text-xs text-ink-soft/70 max-w-xl flex items-start gap-2">
          <span className="text-gold text-lg leading-none">*</span>
          <span>{tableau.note}</span>
        </p>
      )}
    </div>
  );
}

function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-2xl transition-all duration-500 overflow-hidden ${
        isOpen
          ? "bg-white border border-navy/20 shadow-lg shadow-navy/10 my-4"
          : "bg-white/80 border border-navy/5 shadow-sm hover:shadow-md hover:border-navy/15 hover:bg-white"
      }`}
    >
      <motion.button
        whileTap={{ scale: 0.99 }}
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-start gap-4 md:gap-5 p-5 md:p-6 text-left group
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-2xl"
      >
        <span
          className={`font-mono text-sm shrink-0 mt-0.5 transition-all duration-300 font-medium ${
            isOpen ? "text-gold scale-110" : "text-navy/30 group-hover:text-gold"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className={`flex-1 font-display text-base md:text-lg font-medium transition-colors duration-300 ${
          isOpen ? "text-navy" : "text-ink group-hover:text-navy"
        }`}>
          {item.question}
        </span>

        <div className={`shrink-0 flex items-center justify-center h-7 w-7 rounded-full transition-colors duration-300 ${
          isOpen ? "bg-navy text-white" : "bg-navy/5 text-navy/50 group-hover:bg-gold/20 group-hover:text-gold"
        }`}>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChevronDown size={18} strokeWidth={2.5} />
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pl-[3.1rem] md:pl-[3.8rem] pr-5 md:pr-6 pb-6 pt-1">
              <p className="text-sm md:text-base text-ink-soft leading-relaxed max-w-2xl">
                {item.reponse}
              </p>
              {item.tableau && <TableauFaq tableau={item.tableau} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    /* bg-stone-50 apporte une touche très légèrement chaude/crème qui complimente le bleu marine */
    <section id="faq" className="relative bg-stone-50 border-t border-navy/5 py-24 md:py-32 overflow-hidden">
      
      {/* Décoration d'arrière-plan très subtile */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-gold/5 via-transparent to-transparent rounded-bl-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Colonne intro, collante en desktop */}
          <div className="lg:col-span-4">
            <ScrollReveal className="lg:sticky lg:top-32">
              <p className="font-mono text-xs tracking-[0.25em] uppercase text-navy/75 mb-4">
                Questions fréquentes
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink leading-[1.1]">
                Ce que les familles nous demandent
              </h2>
              <p className="mt-5 text-base text-ink-soft leading-relaxed max-w-sm">
                Le plus important avant d'inscrire son enfant, en un coup
                d'œil. Une question ne figure pas ici ?
              </p>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-white border border-navy/10 px-6 py-3 text-sm font-semibold text-navy
                           shadow-sm transition-all duration-300 hover:bg-navy hover:text-white hover:border-navy hover:shadow-lg hover:shadow-navy/20 group"
              >
                <Mail className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:text-gold" />
                Écris-nous directement
              </motion.a>

              <Crest filled={false} className="hidden lg:block mt-16 h-28 w-28 opacity-[0.08]" />
            </ScrollReveal>
          </div>

          {/* Accordéon */}
          <div className="lg:col-span-8 flex flex-col gap-2">
            {FAQS.map((item, i) => (
              <ScrollReveal key={item.question} delay={0.05 * i}>
                <AccordionItem
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}