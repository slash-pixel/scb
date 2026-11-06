interface PrintHeaderProps {
  anneeScolaire?: string;
}

export function PrintHeader({ anneeScolaire }: PrintHeaderProps) {
  return (
    <div className="hidden print:block p-8 border-b-2 border-navy">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/galerie/logo-removebg-preview.png"
            alt="Logo SCB"
            className="h-16 w-16 object-contain"
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-navy">
              République du Cameroun — Paix - Travail - Patrie
            </p>
            <h1 className="font-display text-xl font-bold text-navy-deep uppercase tracking-wide">
              Collège Catholique Saint Charles Borromée
            </h1>
            <p className="text-xs text-ink-soft">
              BP 1234 Douala — Direction des Études — Bulletin Officiel des Notes
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-block px-3 py-1 bg-navy-mist text-navy-deep font-mono text-xs font-bold rounded">
            Année Scolaire : {anneeScolaire || "2026 - 2027"}
          </span>
          <p className="text-[10px] text-ink-soft mt-1">
            Imprimé le {new Date().toLocaleDateString("fr-FR")} à{" "}
            {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PrintFooter() {
  return (
    <div className="hidden print:block mt-12 pt-8 border-t-2 border-navy text-xs">
      <div className="grid grid-cols-3 gap-6 text-center">
        <div className="space-y-12">
          <p className="font-bold text-navy-deep">Le Professeur Principal</p>
          <p className="text-[10px] text-ink-soft italic">Signature & Visa</p>
        </div>
        <div className="space-y-12">
          <p className="font-bold text-navy-deep">Le Parent / Tuteur</p>
          <p className="text-[10px] text-ink-soft italic">Signature</p>
        </div>
        <div className="space-y-12">
          <p className="font-bold text-navy-deep">Le Préfet des Études</p>
          <p className="text-[10px] text-ink-soft italic">Sceau de l'Établissement</p>
        </div>
      </div>
    </div>
  );
}
