import { getFindingStatusOption } from "../lib/findingStatus";

export function FindingStatusBadge({ status }: { status: string | null }) {
  const option = getFindingStatusOption(status);

  if (!option) {
    return (
      <span className="inline-flex items-center justify-center min-w-16 px-2 py-0.5 rounded text-xs font-medium border bg-gray-50 text-gray-600 border-gray-200">
        -
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center min-w-16 px-2 py-0.5 rounded text-xs font-semibold border ${option.className}`}
      title={`${option.label} — ${option.description}`}
      aria-label={`Statut ${option.label} — ${option.description}`}
    >
      {option.label}
    </span>
  );
}
