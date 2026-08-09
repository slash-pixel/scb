import type { ReactNode, ElementType } from "react";
import { motion, useReducedMotion } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Délai avant le déclenchement, en secondes (utile pour un effet en cascade) */
  delay?: number;
  /** Décalage vertical de départ, en pixels */
  y?: number;
  /** Élément HTML à rendre (div par défaut) */
  as?: ElementType;
  className?: string;
}

/**
 * Fait apparaître son contenu (fondu + léger glissement + zoom discret)
 * lorsqu'il entre dans le viewport au défilement.
 *
 * Durée volontairement portée à 1s avec une courbe "expo-out" : assez
 * lente pour être remarquée, sans jamais faire attendre le visiteur.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  y = 32,
  as = "div",
  className = "",
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as as "div"];

  if (prefersReducedMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
