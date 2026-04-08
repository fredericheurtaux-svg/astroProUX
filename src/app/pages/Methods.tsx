import { Link } from "react-router";
import { Search, Target, Users, Layout, BarChart3, GraduationCap } from "lucide-react";

export function Methods() {
  const methods = [
    {
      icon: Search,
      title: "Recherche utilisateur",
      description: "Entretiens, observation, recueil de besoins, analyse des irritants et compréhension des usages réels pour mieux cerner les attentes, les contraintes et les écarts entre le travail prescrit et le travail réel."
    },
    {
      icon: Target,
      title: "Cadrage et clarification",
      description: "Formalisation des besoins, alignement entre parties prenantes, structuration des parcours, mise à plat des cas d'usage et aide à la priorisation pour rendre les sujets plus lisibles et plus faisables."
    },
    {
      icon: Users,
      title: "Ateliers et intelligence collective",
      description: "Animation d'ateliers de cadrage, d'idéation, de co-conception ou de priorisation pour faire émerger les enjeux, confronter les points de vue et avancer collectivement."
    },
    {
      icon: Layout,
      title: "Conception et prototypage",
      description: "Construction de parcours, wireframes, prototypes et premières logiques d'interface pour rendre les solutions discutables, testables et progressivement industrialisables."
    },
    {
      icon: BarChart3,
      title: "Évaluation et amélioration",
      description: "Audit UX, analyse heuristique, tests utilisateurs, synthèse des constats et recommandations pour identifier ce qui freine, ce qui fonctionne et ce qu'il faut faire évoluer en priorité."
    },
    {
      icon: GraduationCap,
      title: "Transmission et montée en compétence",
      description: "Formation, accompagnement, pédagogie et partage de méthodes pour aider les équipes, les étudiants ou les parties prenantes à mieux comprendre et pratiquer l'UX."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 text-gray-900 tracking-tight leading-[1.05]">
            Méthodes & accompagnements
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            J'adapte mes méthodes au contexte, au niveau de maturité UX et au temps disponible. 
            L'objectif n'est pas d'appliquer une recette, mais d'aider à comprendre, cadrer, concevoir 
            et faire avancer un produit ou un service de manière utile et réaliste.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-32">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8 text-gray-900 tracking-tight">
            Une démarche pragmatique, du terrain à la décision
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Selon les sujets, j'interviens en amont pour clarifier un besoin, au cours d'un projet 
            pour structurer et concevoir, ou en amélioration continue pour identifier les irritants 
            et prioriser les évolutions. J'alterne selon les cas recherche, cadrage, ateliers, conception, 
            prototypage et accompagnement des arbitrages.
          </p>
        </div>
      </section>

      {/* Outils et méthodes */}
      <section className="bg-gray-50 py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900 tracking-tight">
              Outils et méthodes
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {methods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="bg-white p-8 lg:p-10 rounded-sm">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-900 rounded-sm flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl text-gray-900 pt-2">
                      {method.title}
                    </h3>
                  </div>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {method.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Outils fréquemment mobilisés */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-gray-900 tracking-tight">
            Outils fréquemment mobilisés
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Les outils comptent moins que leur usage. J'utilise ce qui aide le mieux à comprendre, 
            à faire dialoguer les parties prenantes et à rendre les décisions plus claires : entretiens, 
            ateliers, Figma, audits, prototypage, tests et synthèses visuelles.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-8 text-gray-900 tracking-tight leading-tight">
            Une méthode adaptée au contexte, pas une recette figée
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Chaque mission a ses contraintes : temps, budget, maturité UX, nombre de parties prenantes, 
            niveau de complexité. L'enjeu est de choisir le bon niveau de méthode pour faire avancer 
            le sujet utilement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white text-base rounded hover:bg-gray-800 transition-colors"
            >
              Me contacter
            </Link>
            <Link
              to="/appointment"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-900 text-gray-900 text-base rounded hover:bg-gray-50 transition-colors"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
