import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import { ChevronRight, Pencil, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { FindingStatusBadge } from "../../components/FindingStatusBadge";
import { SeverityBadge } from "../../components/SeverityBadge";
import { FINDING_STATUS_OPTIONS, getFindingStatusLabel } from "../../lib/findingStatus";
import { SEVERITY_OPTIONS, getSeverityLabel } from "../../lib/severity";

interface Finding {
  id: number;
  capture_id: number;
  project_id: number;
  title: string;
  description: string;
  severity: number | null;
  framework: string;
  heuristic_primary: string;
  heuristic_secondary: string;
  ai_suggested_heuristic_primary: string;
  ai_suggested_heuristic_secondary: string;
  heuristic_primary_impact: string;
  heuristic_secondary_impact: string;
  ai_suggested_severity: number | null;
  ai_severity_rationale: string;
  ai_accessibility_impact: string;
  ai_recommendations: string;
  issue_type: string;
  suspected_ui_element: string;
  ai_confidence_level: string;
  final_recommendations: string;
  review_status: string;
  created_at: string;
  updated_at: string;
  created_at_label: string;
  updated_at_label: string;
  page_url: string;
  page_title: string;
  image_path: string;
  image_width: number | null;
  image_height: number | null;
  highlight_zone: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  project_name: string;
}

interface EditableFinding {
  title: string;
  description: string;
  severity: string;
  framework: string;
  heuristic_primary: string;
  heuristic_secondary: string;
  heuristic_primary_impact: string;
  heuristic_secondary_impact: string;
  ai_suggested_severity: string;
  ai_severity_rationale: string;
  ai_recommendations: string;
  final_recommendations: string;
  review_status: string;
}

const NIELSEN_HEURISTICS = [
  {
    code: "H1",
    label: "Visibilité du statut système",
    title:
      "Le système doit toujours informer l'utilisateur de ce qui se passe, via un feedback approprié dans un délai raisonnable.",
  },
  {
    code: "H2",
    label: "Correspondance avec le monde réel",
    title:
      "Le système doit parler le langage de l'utilisateur, avec des mots, phrases et concepts familiers plutôt que des termes techniques.",
  },
  {
    code: "H3",
    label: "Contrôle et liberté",
    title:
      "Les utilisateurs font souvent des erreurs et ont besoin d'une sortie de secours clairement indiquée pour quitter l'état non désiré.",
  },
  {
    code: "H4",
    label: "Cohérence et standards",
    title:
      "Les utilisateurs ne devraient pas avoir à se demander si des mots, situations ou actions différents signifient la même chose.",
  },
  {
    code: "H5",
    label: "Prévention des erreurs",
    title:
      "Mieux vaut concevoir soigneusement pour éviter les problèmes plutôt que de produire de bons messages d'erreur.",
  },
  {
    code: "H6",
    label: "Reconnaissance plutôt que rappel",
    title:
      "Minimiser la charge mémorielle en rendant les objets, actions et options visibles.",
  },
  {
    code: "H7",
    label: "Flexibilité et efficacité",
    title:
      "Des accélérateurs invisibles pour les novices peuvent accélérer l'interaction pour les experts.",
  },
  {
    code: "H8",
    label: "Design minimaliste",
    title:
      "Les dialogues ne doivent pas contenir d'informations non pertinentes ou rarement nécessaires.",
  },
  {
    code: "H9",
    label: "Aide aux erreurs",
    title:
      "Les messages d'erreur doivent être exprimés en langage clair, indiquer précisément le problème et suggérer une solution.",
  },
  {
    code: "H10",
    label: "Aide et documentation",
    title:
      "Même si le système peut être utilisé sans documentation, il peut être nécessaire de fournir une aide facilement accessible.",
  },
] as const;

function getNielsenHeuristic(code: string | null | undefined) {
  return NIELSEN_HEURISTICS.find((heuristic) => heuristic.code === code) || null;
}

function getNielsenLabel(code: string | null | undefined) {
  const heuristic = getNielsenHeuristic(code);
  if (!heuristic) {
    return code && code.trim() ? code : "-";
  }

  return `${heuristic.code} – ${heuristic.label}`;
}

function displayFindingDate(label: string | null | undefined) {
  return label && label.trim() ? label : "-";
}

function displayFindingDateWithRaw(
  label: string | null | undefined,
  raw: string | null | undefined
) {
  if (label && label.trim()) {
    return label;
  }

  if (raw && raw.trim()) {
    return raw;
  }

  return "-";
}

function toDraft(finding: Finding): EditableFinding {
  return {
    title: finding.title || "",
    description: finding.description || "",
    severity: finding.severity == null ? "" : String(finding.severity),
    framework: finding.framework || "",
    heuristic_primary: finding.heuristic_primary || "",
    heuristic_secondary: finding.heuristic_secondary || "",
    heuristic_primary_impact: finding.heuristic_primary_impact || "",
    heuristic_secondary_impact: finding.heuristic_secondary_impact || "",
    ai_suggested_severity:
      finding.ai_suggested_severity == null ? "" : String(finding.ai_suggested_severity),
    ai_severity_rationale: finding.ai_severity_rationale || "",
    ai_recommendations: finding.ai_recommendations || "",
    final_recommendations: finding.final_recommendations || "",
    review_status: finding.review_status || "",
  };
}

function HeuristicSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white"
      >
        <option value="">Sélectionner une heuristique</option>
        {NIELSEN_HEURISTICS.map((heuristic) => (
          <option key={heuristic.code} value={heuristic.code} title={heuristic.title}>
            {heuristic.code} – {heuristic.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function FindingStatusSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">Statut</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white"
      >
        <option value="">Sélectionner un statut</option>
        {FINDING_STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value} title={option.description}>
            {option.label} — {option.description}
          </option>
        ))}
      </select>
      {value && (
        <p className="mt-1 text-xs text-gray-500">{getFindingStatusLabel(value)}</p>
      )}
    </div>
  );
}

function SeveritySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">Sévérité</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white"
      >
        <option value="">Sélectionner une sévérité</option>
        {SEVERITY_OPTIONS.map((option) => (
          <option key={option.value} value={String(option.value)} title={option.description}>
            {option.value} = {option.label} — {option.description}
          </option>
        ))}
      </select>
      {value && (
        <p className="mt-1 text-xs text-gray-500">{getSeverityLabel(Number(value))}</p>
      )}
    </div>
  );
}

export function ProjectFindings() {
  const { projectId } = useParams();
  const { token, logout } = useAuth();

  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<EditableFinding | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const thumbCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const visibleFindings = useMemo(() => {
    const currentProjectId = Number(projectId);
    return findings.filter((finding) => Number(finding.project_id) === currentProjectId);
  }, [findings, projectId]);

  const currentFinding = useMemo(
    () => visibleFindings.find((finding) => finding.id === editingId) || null,
    [visibleFindings, editingId]
  );

  const canDrawCapture = useMemo(() => {
    return Boolean(currentFinding?.image_path);
  }, [currentFinding]);

  const loadFindings = async () => {
    if (!token || !projectId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/client/projects/${projectId}/findings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        logout();
        return;
      }

      if (res.status === 403) {
        setError("Vous n'avez pas les droits pour consulter ce projet.");
        return;
      }

      if (!res.ok) {
        setError("Impossible de charger les défauts.");
        return;
      }

      const data = await res.json();
      if (!data.ok) {
        setError("Impossible de charger les défauts.");
        return;
      }

      setFindings(Array.isArray(data.data) ? data.data : []);
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFindings();
  }, [projectId, token]);

  const startEdit = (finding: Finding) => {
    setEditingId(finding.id);
    setDraft(toDraft(finding));
    setOverlayOpen(false);
    setAiMessage(null);
  };

  const closeEdit = () => {
    setEditingId(null);
    setDraft(null);
    setOverlayOpen(false);
    setAiLoading(false);
    setAiMessage(null);
  };

  const handleEnrichWithAI = async () => {
    if (!token || !editingId) {
      return;
    }

    setAiLoading(true);
    setAiMessage(null);

    try {
      const res = await fetch(`/api/audit/findings/${editingId}/enrich-ai`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        logout();
        return;
      }

      const payload = await res.json().catch(() => null);

      if (!res.ok || !payload?.ok) {
        setAiMessage({
          type: "error",
          text: payload?.details || payload?.error || "Erreur pendant l’enrichissement IA.",
        });
        return;
      }

      await loadFindings();
      setAiMessage({
        type: "success",
        text: "Le finding a été enrichi par l’IA.",
      });
    } catch {
      setAiMessage({
        type: "error",
        text: "Erreur réseau pendant l’enrichissement IA.",
      });
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (!currentFinding?.image_path) {
      return;
    }

    const canvas = thumbCanvasRef.current;
    if (!canvas) {
      return;
    }

    const image = new Image();
    image.onload = () => {
      const maxWidth = 720;
      const scale = Math.min(1, maxWidth / image.naturalWidth);
      const drawWidth = Math.max(1, Math.round(image.naturalWidth * scale));
      const drawHeight = Math.max(1, Math.round(image.naturalHeight * scale));

      canvas.width = drawWidth;
      canvas.height = drawHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      ctx.clearRect(0, 0, drawWidth, drawHeight);
      ctx.drawImage(image, 0, 0, drawWidth, drawHeight);

      const zone = currentFinding.highlight_zone;
      if (zone) {
        const sx = drawWidth / image.naturalWidth;
        const sy = drawHeight / image.naturalHeight;
        const rx = zone.x * sx;
        const ry = zone.y * sy;
        const rw = zone.width * sx;
        const rh = zone.height * sy;

        ctx.fillStyle = "rgba(255, 165, 0, 0.3)";
        ctx.fillRect(rx, ry, rw, rh);
        ctx.strokeStyle = "rgba(255, 165, 0, 1)";
        ctx.lineWidth = 2;
        ctx.strokeRect(rx, ry, rw, rh);
      }
    };
    image.src = currentFinding.image_path;
  }, [currentFinding]);

  useEffect(() => {
    if (!overlayOpen || !currentFinding?.image_path) {
      return;
    }

    const canvas = overlayCanvasRef.current;
    if (!canvas) {
      return;
    }

    const image = new Image();
    image.onload = () => {
      const maxWidth = Math.floor(window.innerWidth * 0.92);
      const maxHeight = Math.floor(window.innerHeight * 0.88);
      const scale = Math.min(1, maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);

      const drawWidth = Math.max(1, Math.round(image.naturalWidth * scale));
      const drawHeight = Math.max(1, Math.round(image.naturalHeight * scale));

      canvas.width = drawWidth;
      canvas.height = drawHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }

      ctx.clearRect(0, 0, drawWidth, drawHeight);
      ctx.drawImage(image, 0, 0, drawWidth, drawHeight);

      const zone = currentFinding.highlight_zone;
      if (zone) {
        const sx = drawWidth / image.naturalWidth;
        const sy = drawHeight / image.naturalHeight;
        const rx = zone.x * sx;
        const ry = zone.y * sy;
        const rw = zone.width * sx;
        const rh = zone.height * sy;

        ctx.fillStyle = "rgba(255, 165, 0, 0.3)";
        ctx.fillRect(rx, ry, rw, rh);
        ctx.strokeStyle = "rgba(255, 165, 0, 1)";
        ctx.lineWidth = 3;
        ctx.strokeRect(rx, ry, rw, rh);
      }
    };
    image.src = currentFinding.image_path;
  }, [overlayOpen, currentFinding]);

  useEffect(() => {
    if (!editingId || !canDrawCapture) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " || event.code === "Space") {
        event.preventDefault();
        setOverlayOpen((value) => !value);
        return;
      }

      if (event.key === "Escape") {
        if (overlayOpen) {
          event.preventDefault();
          setOverlayOpen(false);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [editingId, canDrawCapture, overlayOpen]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !editingId || !draft) return;

    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...draft,
        severity: draft.severity === "" ? null : Number(draft.severity),
        ai_suggested_severity:
          draft.ai_suggested_severity === "" ? null : Number(draft.ai_suggested_severity),
      };

      const res = await fetch(`/api/client/findings/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        logout();
        return;
      }

      if (res.status === 403) {
        setError("Vous n'avez pas les droits pour modifier ce défaut.");
        return;
      }

      if (!res.ok) {
        const response = await res.json().catch(() => null);
        setError(response?.error || "Impossible de sauvegarder le défaut.");
        return;
      }

      await loadFindings();
      closeEdit();
    } catch {
      setError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link to="/client" className="hover:text-gray-900 transition-colors">
          Tableau de bord
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/client/audit-heuristique" className="hover:text-gray-900 transition-colors">
          Audit Heuristique
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Défauts</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Défauts du projet
          </h1>
          {!loading && !error && visibleFindings.length > 0 && (
            <p className="mt-1 text-sm text-gray-500">
              {visibleFindings[0].project_name} • {visibleFindings.length} défaut{visibleFindings.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {error && (
        <div role="alert" className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-4 py-3">
          {error}
        </div>
      )}

      {loading && <div className="text-sm text-gray-500 py-8 text-center">Chargement des défauts…</div>}

      {!loading && !error && visibleFindings.length === 0 && (
        <div className="text-sm text-gray-500 py-8 text-center bg-white border border-gray-200 rounded-lg">
          Aucun défaut pour ce projet.
        </div>
      )}

      {!loading && !error && visibleFindings.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Heuristiques</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Sévérité</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Créé le</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Modifié le</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {visibleFindings.map((finding) => (
                  <tr key={finding.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{finding.title || "Sans titre"}</p>
                      <p className="text-xs text-gray-500 mt-1">{finding.page_title || finding.page_url}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      <div className="space-y-1">
                        <div>{getNielsenLabel(finding.heuristic_primary)}</div>
                        <div>{getNielsenLabel(finding.heuristic_secondary)}</div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <SeverityBadge severity={finding.severity} />
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      <FindingStatusBadge status={finding.review_status} />
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {displayFindingDateWithRaw(finding.created_at_label, finding.created_at)}
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {displayFindingDateWithRaw(finding.updated_at_label, finding.updated_at)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => startEdit(finding)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded hover:border-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                        Editer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {editingId && draft && currentFinding && (
        <div className="fixed inset-0 z-50 bg-black/30 flex justify-end">
          <div className="h-full w-full max-w-2xl bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-gray-900">Editer le défaut #{editingId}</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleEnrichWithAI}
                  disabled={aiLoading || saving}
                  className="px-3 py-2 text-sm border border-gray-300 rounded hover:border-gray-400 disabled:opacity-60"
                >
                  {aiLoading ? "Enrichissement IA..." : "Soumettre a OpenAI"}
                </button>
                <button
                  type="button"
                  onClick={closeEdit}
                  className="p-2 rounded hover:bg-gray-100"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div className="flex items-center justify-between gap-3">
                {aiMessage && (
                  <p
                    className={`text-sm ${
                      aiMessage.type === "success" ? "text-emerald-700" : "text-red-600"
                    }`}
                  >
                    {aiMessage.text}
                  </p>
                )}
              </div>

              {canDrawCapture && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-medium text-gray-600">
                      Capture associée
                    </label>
                    <span className="text-xs text-gray-500">Espace : ouvrir/fermer</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOverlayOpen(true)}
                    className="block w-full border border-gray-200 rounded overflow-hidden hover:border-gray-400 transition-colors"
                    aria-label="Ouvrir la capture en plein écran"
                  >
                    <canvas
                      ref={thumbCanvasRef}
                      className="w-full h-auto block bg-gray-50"
                    />
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Créé le (lecture seule)</label>
                  <input
                    type="text"
                    value={displayFindingDateWithRaw(currentFinding.created_at_label, currentFinding.created_at)}
                    disabled
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Modifié le (lecture seule)</label>
                  <input
                    type="text"
                    value={displayFindingDateWithRaw(currentFinding.updated_at_label, currentFinding.updated_at)}
                    disabled
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Titre</label>
                <input
                  type="text"
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  rows={4}
                  value={draft.description}
                  onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <SeveritySelect
                  value={draft.severity}
                  onChange={(value) => setDraft({ ...draft, severity: value })}
                />
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">AI Sévérité suggérée</label>
                  <input
                    type="number"
                    min={1}
                    max={4}
                    value={draft.ai_suggested_severity}
                    onChange={(e) => setDraft({ ...draft, ai_suggested_severity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Framework</label>
                  <input
                    type="text"
                    value={draft.framework}
                    onChange={(e) => setDraft({ ...draft, framework: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <FindingStatusSelect
                  value={draft.review_status}
                  onChange={(value) => setDraft({ ...draft, review_status: value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <HeuristicSelect
                  label="Heuristique primaire"
                  value={draft.heuristic_primary}
                  onChange={(value) => setDraft({ ...draft, heuristic_primary: value })}
                />
                <HeuristicSelect
                  label="Heuristique secondaire"
                  value={draft.heuristic_secondary}
                  onChange={(value) => setDraft({ ...draft, heuristic_secondary: value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Impact heuristique primaire</label>
                <textarea
                  rows={3}
                  value={draft.heuristic_primary_impact}
                  onChange={(e) => setDraft({ ...draft, heuristic_primary_impact: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Impact heuristique secondaire</label>
                <textarea
                  rows={3}
                  value={draft.heuristic_secondary_impact}
                  onChange={(e) => setDraft({ ...draft, heuristic_secondary_impact: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    IA Heuristique primaire proposée
                  </label>
                  <input
                    type="text"
                    value={currentFinding.ai_suggested_heuristic_primary || "-"}
                    disabled
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-gray-50 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    IA Heuristique secondaire proposée
                  </label>
                  <input
                    type="text"
                    value={currentFinding.ai_suggested_heuristic_secondary || "-"}
                    disabled
                    className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-gray-50 text-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Rationale IA</label>
                <textarea
                  rows={3}
                  value={draft.ai_severity_rationale}
                  onChange={(e) => setDraft({ ...draft, ai_severity_rationale: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Recommandations IA</label>
                <textarea
                  rows={3}
                  value={draft.ai_recommendations}
                  onChange={(e) => setDraft({ ...draft, ai_recommendations: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Impact accessibilité IA</label>
                <textarea
                  rows={3}
                  value={currentFinding.ai_accessibility_impact || ""}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Niveau de confiance IA</label>
                <input
                  type="text"
                  value={currentFinding.ai_confidence_level || "-"}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Type de problème</label>
                <input
                  type="text"
                  value={currentFinding.issue_type || "-"}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Élément UI concerné</label>
                <input
                  type="text"
                  value={currentFinding.suspected_ui_element || "-"}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded text-sm bg-gray-50 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Recommandations finales</label>
                <textarea
                  rows={4}
                  value={draft.final_recommendations}
                  onChange={(e) => setDraft({ ...draft, final_recommendations: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                />
              </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEdit}
                  disabled={saving}
                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:border-gray-400"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 disabled:opacity-60"
                >
                  {saving ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {overlayOpen && currentFinding?.image_path && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setOverlayOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu plein écran de la capture"
        >
          <canvas
            ref={overlayCanvasRef}
            className="max-w-full max-h-full bg-black"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
