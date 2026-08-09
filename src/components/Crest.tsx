interface CrestProps {
  className?: string;
  /** Ajoute un fond clair (médaillon) pour que le sceau reste lisible sur
   * n'importe quel arrière-plan. À désactiver pour un usage en filigrane
   * (trait seul, très faible opacité). */
  filled?: boolean;
}

const GOLD = "var(--color-gold)";
const NAVY = "var(--color-navy)";

/**
 * Le sceau du collège — élément signature réutilisé dans la nav, le hero,
 * la section "À propos" (en filigrane) et le footer.
 *
 * Version bicolore : anneau, croix et brins de laurier en or, monogramme
 * "SCB" et petites étoiles en bleu marine — sur un médaillon clair, pour
 * rester lisible aussi bien sur fond sombre (nav, hero) que sur fond clair.
 */
export default function Crest({ className = "", filled = true }: CrestProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      {filled && <circle cx="60" cy="60" r="58" fill="#fbf9f2" />}

      <circle cx="60" cy="60" r="56" stroke={GOLD} strokeWidth="1.5" />
      <circle cx="60" cy="60" r="49" stroke={GOLD} strokeWidth="1" strokeDasharray="2 4" />

      {/* petite croix sommitale, encadrée de deux étoiles */}
      <path d="M60 20V32M55 25H65" stroke={GOLD} strokeWidth="2" strokeLinecap="round" />
      <text x="38" y="31" textAnchor="middle" fontSize="9" fill={NAVY}>
        ✦
      </text>
      <text x="82" y="31" textAnchor="middle" fontSize="9" fill={NAVY}>
        ✦
      </text>

      {/* monogramme, en bleu */}
      <text
        x="60"
        y="70"
        textAnchor="middle"
        fontFamily="'Fraunces', serif"
        fontWeight="600"
        fontSize="30"
        fill={NAVY}
      >
        SCB
      </text>

      {/* brins de laurier, gauche et droite */}
      <path d="M30 78C34 84 34 92 30 98" stroke={GOLD} strokeWidth="1.2" fill="none" />
      <path d="M30 82c3-1 5 1 4 4M30 90c3-1 5 1 4 4" stroke={GOLD} strokeWidth="1" />
      <path d="M90 78C86 84 86 92 90 98" stroke={GOLD} strokeWidth="1.2" fill="none" />
      <path d="M90 82c-3-1-5 1-4 4M90 90c-3-1-5 1-4 4" stroke={GOLD} strokeWidth="1" />
    </svg>
  );
}
