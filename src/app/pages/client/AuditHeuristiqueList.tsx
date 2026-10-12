import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ExternalLink, ChevronRight, ListTodo } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface AuditProject {
  id: number;
  name: string;
  base_url: string;
  created_at: string;
  updated_at: string;
  findings_count: number;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function FindingsBadge({ count }: { count: number }) {
  const color =
    count >= 30
      ? "bg-red-50 text-red-700 border-red-200"
      : count >= 15
      ? "bg-orange-50 text-orange-700 border-orange-200"
      : "bg-green-50 text-green-700 border-green-200";

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${color}`}>
      {count} défaut{count > 1 ? "s" : ""}
    </span>
  );
}

export function AuditHeuristiqueList() {
  const { token, logout } = useAuth();
  const [projects, setProjects] = useState<AuditProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    fetch("/api/client/projects", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          logout();
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.ok) {
          setProjects(data.data);
        } else {
          setError("Impossible de charger les projets.");
        }
      })
      .catch(() => setError("Erreur réseau. Veuillez réessayer."))
      .finally(() => setLoading(false));
  }, [token, logout]);

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
        <Link to="/client" className="hover:text-gray-900 transition-colors">
          Tableau de bord
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Audit Heuristique</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Audit Heuristique
          </h1>
          {!loading && !error && (
            <p className="mt-1 text-sm text-gray-500">
              {projects.length} projet{projects.length > 1 ? "s" : ""} audité{projects.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {loading && (
        <div className="text-sm text-gray-500 py-8 text-center">Chargement des projets…</div>
      )}

      {error && (
        <div role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-4 py-3">
          {error}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="text-sm text-gray-500 py-8 text-center bg-white border border-gray-200 rounded-lg">
          Aucun projet audité pour le moment.
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projet
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Créé le
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modifié le
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Défauts
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-medium text-gray-900">{project.name}</span>
                    </td>
                    <td className="px-5 py-4">
                      <a
                        href={project.base_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors max-w-[200px] truncate"
                        title={project.base_url}
                      >
                        <span className="truncate">{project.base_url.replace(/^https?:\/\//, "")}</span>
                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(project.created_at)}
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {formatDate(project.updated_at)}
                    </td>
                    <td className="px-5 py-4">
                      <FindingsBadge count={project.findings_count} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        to={`/client/audit-heuristique/${project.id}/findings`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded hover:border-gray-400 hover:text-gray-900 transition-colors"
                      >
                        <ListTodo className="w-4 h-4" />
                        Voir défauts
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
