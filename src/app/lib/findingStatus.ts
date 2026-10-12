export const FINDING_STATUS_OPTIONS = [
  {
    value: "draft",
    label: "Brouillon",
    description: "Défaut non finalisé",
    className: "bg-gray-50 text-gray-700 border-gray-200",
  },
  {
    value: "reviewed",
    label: "Relu",
    description: "Défaut validé par l’équipe",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    value: "in_progress",
    label: "En cours",
    description: "Correction en cours",
    className: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    value: "fixed",
    label: "Corrigé",
    description: "Correction appliquée",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    value: "wont_fix",
    label: "Non corrigé",
    description: "Décidé comme non prioritaire",
    className: "bg-slate-900 text-white border-slate-900",
  },
] as const;

export type FindingStatusValue = (typeof FINDING_STATUS_OPTIONS)[number]["value"];

export function getFindingStatusOption(status: string | null | undefined) {
  if (!status) {
    return null;
  }

  return FINDING_STATUS_OPTIONS.find((option) => option.value === status) || null;
}

export function getFindingStatusLabel(status: string | null | undefined) {
  const option = getFindingStatusOption(status);
  if (!option) {
    return status && status.trim() ? status : "-";
  }

  return option.label;
}
