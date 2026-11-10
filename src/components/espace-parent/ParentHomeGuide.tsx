import { User, ShieldCheck, Printer, HelpCircle } from "lucide-react";

export default function ParentHomeGuide() {
  return (
    <div className="space-y-12">
      {/* CARTES CONSEILS PARENTS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 space-y-3 hover:border-gold/40 transition-colors">
          <div className="h-12 w-12 rounded-2xl bg-navy-mist text-navy flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-navy-deep">
            Matricule Officiel
          </h3>
          <p className="text-xs text-ink-soft leading-relaxed">
            Le matricule est le numéro d'identification scolaire unique de votre enfant
            (ex : <code className="font-mono text-navy font-bold">480</code> ou{" "}
            <code className="font-mono text-navy font-bold">0000000</code>).
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 space-y-3 hover:border-gold/40 transition-colors">
          <div className="h-12 w-12 rounded-2xl bg-amber-50 text-gold flex items-center justify-center">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-navy-deep">
            Confidentialité Garantie
          </h3>
          <p className="text-xs text-ink-soft leading-relaxed">
            Pour assurer la protection rigoureuse des données des élèves, l'accès au
            relevé s'effectue exclusivement au moyen de son matricule personnel.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 space-y-3 hover:border-gold/40 transition-colors">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Printer className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-navy-deep">
            Impression & Export
          </h3>
          <p className="text-xs text-ink-soft leading-relaxed">
            Dès l'affichage du relevé, vous pouvez l'imprimer ou l'enregistrer en PDF
            conforme à la maquette officielle du Collège en un seul clic.
          </p>
        </div>
      </div>

      {/* SECTION FAQ PARENTS */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gold/10 text-gold">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-navy-deep">
              Foire Aux Questions des Parents
            </h3>
            <p className="text-xs text-ink-soft">
              Tout ce que vous devez savoir pour suivre la scolarité de votre enfant
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-xs text-ink-soft">
          <div className="space-y-1.5 p-4 rounded-2xl bg-paper">
            <h4 className="font-bold text-navy-deep text-sm">
              Où puis-je trouver le matricule de mon enfant ?
            </h4>
            <p className="leading-relaxed">
              Le matricule officiel figure sur le carnet de correspondance, les reçus de
              paiement de scolarité remis par l'économat ainsi que sur les bulletins des
              trimestres précédents.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-paper">
            <h4 className="font-bold text-navy-deep text-sm">
              À quelle fréquence les notes sont-elles actualisées ?
            </h4>
            <p className="leading-relaxed">
              Les notes sont synchronisées au fur et à mesure de leur validation par les
              enseignants et la direction des études de l'établissement.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-paper">
            <h4 className="font-bold text-navy-deep text-sm">
              Que faire si le matricule n'affiche aucun relevé ?
            </h4>
            <p className="leading-relaxed">
              Vérifiez attentivement la saisie du numéro. Si le problème persiste, il se peut
              que les notes de la période soient encore en cours de saisie administrative.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-paper">
            <h4 className="font-bold text-navy-deep text-sm">
              Une question ou une contestation sur une note ?
            </h4>
            <p className="leading-relaxed">
              Prenez contact avec le secrétariat ou le préfet des études du Collège
              Catholique Saint Charles Borromée via notre formulaire de contact ou par
              téléphone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
