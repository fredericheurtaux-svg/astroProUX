import { getSeverityOption } from "../lib/severity";

export function SeverityBadge({ severity }: { severity: number | null }) {
  const option = getSeverityOption(severity);

  if (!option) {
    return (
      <span className="inline-flex items-center justify-center min-w-6 px-2 py-0.5 rounded text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200">
        -
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center min-w-6 px-2 py-0.5 rounded text-xs font-semibold border ${option.badgeClassName}`}
      title={`${option.value} — ${option.label} — ${option.description}`}
      aria-label={`Sévérité ${option.value} — ${option.label} — ${option.description}`}
    >
      {option.value}
    </span>
  );
}
