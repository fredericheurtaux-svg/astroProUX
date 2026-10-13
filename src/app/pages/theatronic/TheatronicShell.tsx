import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { Drama, Menu, X, Mail, MapPin } from "lucide-react";

export const font = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

const nav = [
  { label: "Accueil", href: "/theatronic#accueil" },
  { label: "L'atelier", href: "/theatronic#atelier" },
  { label: "La démarche", href: "/theatronic#demarche" },
  { label: "Représentations", href: "/theatronic#representations" },
  { label: "Découvrir", href: "/theatronic#exemples" },
  { label: "Galerie", href: "/theatronic/galerie" },
  { label: "Pour les structures", href: "/theatronic#structures" },
];

export function TheatronicShell({ children, title }: { children: ReactNode; title?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} – Théâtronic` : "Théâtronic – Fabrique de récits";
    return () => {
      document.title = previous;
    };
  }, [title]);

  return (
    <div className="min-h-screen bg-[#fdfaf5] text-[#162238]" style={font}>
      <header className="sticky top-0 z-50 bg-[#fdfaf5]/95 backdrop-blur border-b border-[#eddacf]">
        <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between" aria-label="Théâtronic">
          <a href="/theatronic#accueil" className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#f26430] text-white flex items-center justify-center">
              <Drama className="w-6 h-6" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-extrabold">Théâtronic</span>
              <span className="block text-xs text-[#546075]">Fabrique de récits</span>
            </span>
          </a>
          <div className="hidden xl:flex items-center gap-6 text-sm font-semibold">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-[#f26430] transition-colors">{n.label}</a>
            ))}
            <a href="/theatronic#contact" className="px-5 py-2.5 rounded-full bg-[#162238] text-white hover:bg-[#f26430] transition-colors">
              Proposer un atelier
            </a>
          </div>
          <button
            className="xl:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        {open && (
          <div className="xl:hidden px-6 pb-6 flex flex-col gap-4 text-sm font-semibold border-t border-[#eddacf]">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="pt-4">{n.label}</a>
            ))}
            <a href="/theatronic#contact" onClick={() => setOpen(false)} className="text-[#f26430]">Proposer un atelier</a>
          </div>
        )}
      </header>

      {children}

      <footer className="bg-[#162238] text-white">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="flex items-center gap-2 text-lg font-extrabold mb-3">
              <Drama className="w-6 h-6" aria-hidden="true" /> Théâtronic
            </p>
            <p className="text-white/70">
              Quand le papier découpé rencontre la robotique, l’imaginaire des enfants et des ados prend vie parfois de façon spectaculaire !
            </p>
          </div>
          <div>
            <p className="font-bold mb-3">Parcours & ateliers</p>
            <ul className="space-y-1 text-white/70">
              <li>Théâtre de papier</li>
              <li>Automates, LED et moteurs</li>
              <li>Fiches ressources & gabarits</li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-3">Médiation culturelle</p>
            <p className="text-white/70 mb-3">
              Dispositifs clés en main subventionnables (Pass Culture, Contrat Territoire-Lecture, DAAC) sous réserve d’éligibilité et de validation du financeur.
            </p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4" aria-hidden="true" />frederic.heurtaux@gmail.com</p>
            <p className="flex items-center gap-2 mt-1"><MapPin className="w-4 h-4" aria-hidden="true" />Interventions France & réseau francophone</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 px-6 text-center text-xs text-white/60 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <span>© {new Date().getFullYear()} Théâtronic. Programme d'action artistique et technologique pour l'enfance.</span>
          <Link to="/theatronic/mentions-legales" className="hover:text-white">Mentions légales</Link>
        </div>
      </footer>
    </div>
  );
}
