import { Mail, Phone } from "lucide-react";
 import { FaFacebook } from "react-icons/fa";
import Crest from "./Crest";

const LIENS = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#a-propos" },
  { label: "Filières", href: "#filieres" },
  { label: "Galerie", href: "#galerie" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/70 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid sm:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Crest className="h-9 w-9" />
              <span className="font-display text-white font-semibold leading-tight">
                Saint Charles
                <br />
                Borromée
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Collège catholique d'enseignement général et technique, à
              Douala.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-gold-soft mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {LIENS.map((lien) => (
                <li key={lien.href}>
                  <a
                    href={lien.href}
                    className="hover:text-gold-soft transition-colors duration-300"
                  >
                    {lien.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-gold-soft mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <a href="tel:+237699018208" className="hover:text-gold-soft transition-colors duration-300">
                  +237 699 01 82 08
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                <a href="mailto:borromeecol@yahoo.com" className="hover:text-gold-soft transition-colors duration-300">
                  borromeecol@yahoo.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaFacebook className="h-4 w-4 text-gold" />
                <a
                  href="https://www.facebook.com/61566968918631"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold-soft transition-colors duration-300"
                >
                  Collège Catholique Saint Charles Borromée
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="pt-8 text-xs text-white/40 text-center">
          © {new Date().getFullYear()} Collège Catholique Saint Charles
          Borromée — Douala, Cameroun. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
