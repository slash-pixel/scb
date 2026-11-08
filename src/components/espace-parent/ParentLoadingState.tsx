import { GraduationCap } from "lucide-react";


export default function ParentLoadingState() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-gold/20 border-t-gold animate-spin" />
        <GraduationCap className="h-6 w-6 text-navy-deep absolute inset-0 m-auto" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display text-lg font-bold text-navy-deep">
          Extraction du relevé de notes...
        </h3>
        <p className="text-xs font-mono text-ink-soft">
          Recherche dans les registres académiques...
        </p>
      </div>
    </div>
  );
}
