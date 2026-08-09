import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Tag,
  User,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import ScrollReveal from "./ScrollReveal";
import Crest from "./Crest";

// Adresse e-mail réelle du collège. Service utilisé : FormSubmit
// (formsubmit.co), gratuit, sans backend à héberger.
// ⚠️ La toute première fois que ce formulaire est utilisé après la mise en
// ligne, FormSubmit envoie un e-mail de confirmation à l'adresse ci-dessous
// — quelqu'un ayant accès à cette boîte doit cliquer une fois sur le lien
// d'activation qu'il contient. Ensuite, tous les messages suivants arrivent
// normalement, sans autre action.
const EMAIL_COLLEGE = "borromeecol@yahoo.com";

type Statut = "idle" | "sending" | "success" | "error";

const CHAMP_VIDE = { nom: "", email: "", sujet: "", message: "" };

const NOM_ETABLISSEMENT = "Collège Catholique Saint Charles Borromée, Douala, Cameroun";

export default function Contact() {
  const [champs, setChamps] = useState(CHAMP_VIDE);
  const [statut, setStatut] = useState<Statut>("idle");
  const honeyRef = useRef<HTMLInputElement>(null);

  const majChamp =
    (cle: keyof typeof CHAMP_VIDE) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setChamps((c) => ({ ...c, [cle]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Piège à robots : un champ invisible pour les humains. S'il est
    // rempli, c'est un bot — on fait semblant que ça a marché, sans rien
    // envoyer.
    if (honeyRef.current?.value) {
      setStatut("success");
      setChamps(CHAMP_VIDE);
      return;
    }

    setStatut("sending");

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL_COLLEGE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          Nom: champs.nom,
          Email: champs.email,
          Message: champs.message,
          _subject: champs.sujet || "Nouveau message — site du collège",
          _replyto: champs.email,
          _template: "table",
          _captcha: "false",
          _honey: honeyRef.current?.value ?? "",
        }),
      });

      if (res.ok) {
        setStatut("success");
        setChamps(CHAMP_VIDE); // vide le formulaire après un envoi réussi
      } else {
        setStatut("error");
      }
    } catch {
      setStatut("error");
    }
  }

  const CHAMPS_TEXTE = [
    { id: "nom" as const, label: "Nom complet", type: "text", icon: User, placeholder: "Votre nom" },
    { id: "email" as const, label: "Email", type: "email", icon: Mail, placeholder: "vous@exemple.com" },
  ];

  const inputCls =
    "w-full rounded-lg border border-navy/15 bg-paper/30 pl-10 pr-4 py-2.5 text-sm text-ink " +
    "transition-all duration-300 hover:border-navy/35 focus:outline-none focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/10";

  return (
    <section id="contact" className="relative bg-navy-mist py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(26,77,143,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal className="max-w-2xl mb-14">
          <p className="font-mono text-xs tracking-[0.25em] uppercase text-navy/75 mb-4">Contact</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ink leading-[1.1]">
            Une question ? Parlons-en
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Coordonnées */}
          <ScrollReveal className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-2xl bg-navy-deep text-white p-8 h-full flex flex-col">
              <Crest filled={false} className="absolute -bottom-8 -right-8 h-36 w-36 opacity-[0.08] pointer-events-none" />

              <h3 className="relative font-display text-xl font-semibold mb-6">Coordonnées</h3>

              <ul className="relative space-y-2 text-sm">
                <li>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(NOM_ETABLISSEMENT)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="group/row flex gap-3 rounded-xl -mx-3 px-3 py-2.5 transition-all duration-300 hover:bg-white/10 hover:translate-x-1"
                  >
                    <span className="h-9 w-9 shrink-0 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover/row:bg-gold group-hover/row:scale-110">
                      <MapPin className="h-4 w-4 text-gold transition-colors duration-300 group-hover/row:text-navy-deep" />
                    </span>
                    {/* Adresse à confirmer / préciser le quartier exact */}
                    <span className="text-white/80 pt-2 transition-colors duration-300 group-hover/row:text-white">
                      BP 897, Douala, Cameroun
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+237699018208"
                    className="group/row flex gap-3 rounded-xl -mx-3 px-3 py-2.5 transition-all duration-300 hover:bg-white/10 hover:translate-x-1"
                  >
                    <span className="h-9 w-9 shrink-0 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover/row:bg-gold group-hover/row:scale-110">
                      <Phone className="h-4 w-4 text-gold transition-colors duration-300 group-hover/row:text-navy-deep" />
                    </span>
                    {/* Numéro à confirmer */}
                    <span className="text-white/80 pt-2 transition-colors duration-300 group-hover/row:text-white">
                      +237 66 99 01 82 08
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL_COLLEGE}`}
                    className="group/row flex gap-3 rounded-xl -mx-3 px-3 py-2.5 transition-all duration-300 hover:bg-white/10 hover:translate-x-1"
                  >
                    <span className="h-9 w-9 shrink-0 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover/row:bg-gold group-hover/row:scale-110">
                      <Mail className="h-4 w-4 text-gold transition-colors duration-300 group-hover/row:text-navy-deep" />
                    </span>
                    <span className="text-white/80 pt-2 transition-colors duration-300 group-hover/row:text-white break-all">
                      {EMAIL_COLLEGE}
                    </span>
                  </a>
                </li>
                <li className="group/row flex gap-3 rounded-xl -mx-3 px-3 py-2.5 transition-all duration-300 hover:bg-white/10">
                  <span className="h-9 w-9 shrink-0 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover/row:bg-gold group-hover/row:scale-110">
                    <Clock className="h-4 w-4 text-gold transition-colors duration-300 group-hover/row:text-navy-deep" />
                  </span>
                  {/* Horaires à confirmer */}
                  <span className="text-white/80 pt-2 transition-colors duration-300 group-hover/row:text-white">
                    Secrétariat : lundi – vendredi, 7h30 – 15h30
                  </span>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/61566968918631"
                    target="_blank"
                    rel="noreferrer"
                    className="group/row flex gap-3 rounded-xl -mx-3 px-3 py-2.5 transition-all duration-300 hover:bg-white/10 hover:translate-x-1"
                  >
                    <span className="h-9 w-9 shrink-0 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover/row:bg-gold group-hover/row:scale-110">
                      <FaFacebook className="h-4 w-4 text-gold transition-colors duration-300 group-hover/row:text-navy-deep" />
                    </span>
                    <span className="text-white/80 pt-2 transition-colors duration-300 group-hover/row:text-white">
                      Collège Catholique Saint Charles Borromée
                    </span>
                  </a>
                </li>
              </ul>

              {/* Carte réelle, positionnée sur le nom de l'établissement.
                  Si le point ne tombe pas exactement sur le bâtiment : Google
                  Maps → recherche l'adresse exacte → "Partager" → "Intégrer
                  une carte", puis remplace le lien ci-dessous. */}
              <div className="group/map relative mt-6 rounded-xl overflow-hidden border border-white/15 h-44">
                <iframe
                  title="Localisation du collège"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(NOM_ETABLISSEMENT)}&output=embed`}
                  className="h-full w-full grayscale-[30%] contrast-[1.05] transition-all duration-500 group-hover/map:grayscale-0"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-x-0 bottom-0 flex justify-end p-2 opacity-0 translate-y-2 transition-all duration-300 group-hover/map:opacity-100 group-hover/map:translate-y-0 pointer-events-none">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(NOM_ETABLISSEMENT)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-navy-deep/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white
                               transition-colors duration-300 hover:bg-gold hover:text-navy-deep"
                  >
                    Ouvrir dans Maps
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Formulaire */}
          <ScrollReveal delay={0.12} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-2xl bg-white border border-navy/10 shadow-xl shadow-navy/10
                         transition-shadow duration-500 hover:shadow-2xl hover:shadow-navy/15"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-gold via-gold-soft to-gold" />

              <div className="p-8 space-y-5">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-navy/60">
                    Formulaire de contact
                  </p>
                  <Crest filled={false} className="h-7 w-7 opacity-30" />
                </div>

                <input
                  ref={honeyRef}
                  type="text"
                  name="_honey"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid sm:grid-cols-2 gap-5">
                  {CHAMPS_TEXTE.map((champ) => (
                    <div key={champ.id} className="group">
                      <label htmlFor={champ.id} className="block text-xs font-medium text-ink-soft mb-1.5">
                        {champ.label}
                      </label>
                      <div className="relative">
                        <champ.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40 transition-colors duration-300 group-hover:text-navy/70" />
                        <input
                          id={champ.id}
                          type={champ.type}
                          required
                          value={champs[champ.id]}
                          onChange={majChamp(champ.id)}
                          className={inputCls}
                          placeholder={champ.placeholder}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="group">
                  <label htmlFor="sujet" className="block text-xs font-medium text-ink-soft mb-1.5">
                    Sujet
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy/40 transition-colors duration-300 group-hover:text-navy/70" />
                    <input
                      id="sujet"
                      type="text"
                      value={champs.sujet}
                      onChange={majChamp("sujet")}
                      className={inputCls}
                      placeholder="Admission, information..."
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-xs font-medium text-ink-soft mb-1.5">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-navy/40 transition-colors duration-300 group-hover:text-navy/70" />
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={champs.message}
                      onChange={majChamp("message")}
                      className={`${inputCls} resize-none`}
                      placeholder="Votre message..."
                    />
                  </div>
                </div>

                {statut === "success" && (
                  <div className="flex items-start gap-2.5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    Message envoyé avec succès — le secrétariat te répondra sous peu.
                  </div>
                )}
                {statut === "error" && (
                  <div className="flex items-start gap-2.5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    L'envoi a échoué. Écris-nous directement à {EMAIL_COLLEGE}, ou réessaie dans un instant.
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-2 text-xs text-ink-soft/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Réponse sous 48h ouvrées
                  </div>
                  <button
                    type="submit"
                    disabled={statut === "sending"}
                    className="group/btn relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-soft px-7 py-3 text-sm font-semibold text-navy-deep
                               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/30
                               disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out
                                 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                    />
                    {statut === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <span className="relative">Envoyer le message</span>
                        <Send className="relative h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
