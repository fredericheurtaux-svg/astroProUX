import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { ClipboardList } from "lucide-react";

const tiles = [
  {
    title: "Audit Heuristique",
    description: "Consultez les résultats de vos audits heuristiques et le détail des défauts identifiés.",
    href: "/client/audit-heuristique",
    icon: ClipboardList,
    count: null,
  },
];

export function ClientDashboard() {
  const { username } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Bonjour {username} 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">Bienvenue dans votre espace client.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.href}
              to={tile.href}
              className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-400 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                  <Icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">
                    {tile.title}
                  </h2>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    {tile.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
