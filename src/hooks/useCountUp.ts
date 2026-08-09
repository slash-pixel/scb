import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Anime un nombre de 0 jusqu'à `target` lorsque l'élément entre dans le
 * viewport. Respecte prefers-reduced-motion (le nombre final s'affiche
 * directement, sans animation).
 */
export function useCountUp(target: number, duration = 1.6) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    let frame: number;
    const start = performance.now();

    // easeOutExpo — montée rapide puis ralentissement net, pour un rendu
    // "spectaculaire mais sobre" plutôt qu'un simple compteur linéaire.
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now: number) => {
      const elapsed = (now - start) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      setValue(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration, prefersReducedMotion]);

  return { ref, value };
}
