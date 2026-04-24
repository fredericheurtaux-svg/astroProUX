import { Outlet, Link, useLocation } from "react-router";
import { Menu, X, Linkedin } from "lucide-react";
import { useState } from "react";
import { ScrollToTop } from "./ScrollToTop";
import { SkipLinks } from "./SkipLinks";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Services', href: '/services' },
    { name: 'Méthodes', href: '/methods' },
    { name: 'Études de cas', href: '/case-studies' },
    { name: 'À propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.indexOf(href) === 0;
  };

  return (
    <div className="min-h-screen bg-white">
      <SkipLinks />
      <ScrollToTop />
      {/* Navigation */}
      <header id="main-nav" className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <nav className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-20">
              <Link to="/" className="text-lg text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                Frédéric HeurtaUX
              </Link>
              <a 
                href="https://www.linkedin.com/in/frederic-heurtaux/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm transition-colors ${
                    isActive(item.href)
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/appointment"
                className="px-5 py-2.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors"
              >
                Prendre rendez-vous
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-6 border-t border-gray-200">
              <div className="pt-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-sm ${
                      isActive(item.href)
                        ? 'text-gray-900'
                        : 'text-gray-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/appointment"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-block px-5 py-2.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors"
                >
                  Prendre rendez-vous
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main id="main-content" className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-sm mb-4 text-gray-900">Frédéric Heurtaux</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                UX Designer & UX Researcher senior<br />
                Freelance basé à Lille et disponible pour des missions partout en France et à distance.<br />
              </p>
            </div>
            
          </div>
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <p className="text-sm text-gray-500">
              © 2026 Frédéric Heurtaux. Tous droits réservés.
            </p>
            <a href="/mentions-legales" className="text-sm text-gray-500 hover:underline">
              Mentions légales
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}