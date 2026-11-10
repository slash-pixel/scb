import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, X } from "lucide-react";

interface ParentHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ParentHelpModal({ isOpen, onClose }: ParentHelpModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gold/30 space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gold/10 text-gold">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-navy-deep">
                  Où trouver le matricule de l'élève ?
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full text-gray-400 hover:text-navy-deep hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-ink-soft leading-relaxed">
              <div className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <strong className="text-navy-deep">Sur le carnet de correspondance :</strong>
                  <p>Le matricule officiel est inscrit sur la page de garde ou la première page de couverture.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <strong className="text-navy-deep">Sur le reçu d'inscription :</strong>
                  <p>
                    La quittance bancaire ou le reçu de scolarité délivré par l'économat mentionne le
                    numéro de matricule officiel de l'élève.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <strong className="text-navy-deep">Auprès du secrétariat :</strong>
                  <p>
                    Si vous ne disposez pas du document physique, contactez directement l'administration
                    du Collège qui vous communiquera le matricule après identification du parent ou tuteur légal.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-navy-deep text-white font-bold text-xs uppercase tracking-wider hover:bg-navy transition-colors cursor-pointer"
              >
                J'ai compris
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
