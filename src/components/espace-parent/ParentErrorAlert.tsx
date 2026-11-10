import { motion } from "framer-motion";
import { AlertCircle, RotateCcw, HelpCircle } from "lucide-react";

interface ParentErrorAlertProps {
  error: string;
  errorCode: number | null;
  onRetry: () => void;
  onOpenHelp: () => void;
}

export default function ParentErrorAlert({
  error,
  errorCode,
  onRetry,
  onOpenHelp,
}: ParentErrorAlertProps) {
  // Titre convivial sans exposer de données techniques
  const errorTitle =
    errorCode === 404
      ? "Élève introuvable"
      : errorCode === 400
      ? "Matricule non reconnu"
      : errorCode === 503
      ? "Actualisation en cours"
      : errorCode === 0
      ? "Connexion momentanément interrompue"
      : "Information indisponible";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-8 rounded-2xl bg-white border border-rose-200 p-6 shadow-sm flex flex-col sm:flex-row items-start gap-4"
    >
      <div className="p-3 rounded-xl bg-rose-50 text-rose-600 shrink-0">
        <AlertCircle className="h-6 w-6" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-rose-900 font-display">
            {errorTitle}
          </h3>
        </div>
        <p className="text-sm text-ink-soft leading-relaxed">{error}</p>

        {/* Actions de résolution conviviales */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {(errorCode === 503 || errorCode === 0) && (
            <button
              type="button"
              onClick={onRetry}
              className="px-4 py-2 rounded-lg bg-gold text-navy-deep text-xs font-bold hover:bg-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Réessayer</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenHelp}
            className="text-xs font-semibold text-navy hover:underline flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="h-3.5 w-3.5 text-gold" />
            <span>Comment retrouver le matricule ?</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
