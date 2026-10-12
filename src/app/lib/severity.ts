export type SeverityLevel = 1 | 2 | 3 | 4;

export type SeverityOption = {
  value: SeverityLevel;
  label: string;
  description: string;
  color: "green" | "yellow" | "red" | "black";
  badgeClassName: string;
};

export const SEVERITY_OPTIONS: readonly SeverityOption[] = [
  {
    value: 1,
    label: "Cosmétique",
    description: "pas d’impact",
    color: "green",
    badgeClassName: "bg-green-50 text-green-700 border-green-200",
  },
  {
    value: 2,
    label: "Mineur",
    description: "impacts limités",
    color: "yellow",
    badgeClassName: "bg-yellow-50 text-yellow-800 border-yellow-300",
  },
  {
    value: 3,
    label: "Majeur",
    description: "impacts importants",
    color: "red",
    badgeClassName: "bg-red-50 text-red-700 border-red-200",
  },
  {
    value: 4,
    label: "Critique",
    description: "bloquant",
    color: "black",
    badgeClassName: "bg-black text-white border-black",
  },
] as const;

export function getSeverityOption(severity: number | null | undefined) {
  if (severity == null) {
    return null;
  }

  const numericSeverity = Math.trunc(Number(severity)) as SeverityLevel;
  return SEVERITY_OPTIONS.find((option) => option.value === numericSeverity) || null;
}

export function getSeverityLabel(severity: number | null | undefined) {
  const option = getSeverityOption(severity);
  if (!option) {
    return "-";
  }

  return `${option.value} — ${option.label} — ${option.description}`;
}

export function getSeverityDisplayValue(severity: number | null | undefined) {
  const option = getSeverityOption(severity);
  return option ? String(option.value) : "-";
}
