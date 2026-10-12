import { Outlet, Link, useNavigate } from "react-router";
import { LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function ClientLayout() {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/client/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                ← Site public
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                to="/client"
                className="text-sm font-medium text-gray-900"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Espace client
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded hover:border-gray-300 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
}
