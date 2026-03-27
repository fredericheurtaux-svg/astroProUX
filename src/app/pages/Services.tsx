import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export function Services() {
  const services = [
    {
      title: "Recherche utilisateur",
      description: "Comprendre les besoins réels, les comportements et les contraintes de vos utilisateurs",
      details: [
        "Entretiens qualitatifs (individuels ou collectifs)",
        "Observations terrain et shadowing",
        "Tests d'usabilité (modérés ou à distance)",
        "Analyse de données analytics",
        "Cartographie des personas et des parcours"
      ],
      output: "Livrables : rapport de recherche, personas, cartographie des parcours, recommandations stratégiques"
    },
    {
      title: "Cadrage et stratégie UX",
      description: "Définir le périmètre, les priorités et la feuille de route produit",
      details: [
        "Ateliers de cadrage avec les parties prenantes",
        "Définition des objectifs utilisateurs et business",
        "Priorisation des fonctionnalités (impact / effort)",
        "Benchmark concurrentiel et analyse de l'existant",
        "Formalisation de la vision produit"
      ],
      output: "Livrables : document de cadrage, roadmap UX, matrice de priorisation, benchmark"
    },
    {
      title: "Conception de parcours et d'interfaces",
      description: "Traduire les besoins en solutions concrètes, testables et réalisables",
      details: [
        "Architecture de l'information",
        "Wireframes basse et haute fidélité",
        "Prototypes interactifs (desktop, mobile, tablette)",
        "Spécifications fonctionnelles et annotations",
        "Design system (si besoin)"
      ],
      output: "Livrables : wireframes, prototypes Figma, spécifications pour les équipes dev"
    },
    {
      title: "Audit et amélioration continue",
      description: "Identifier les points de friction et proposer des optimisations ciblées",
      details: [
        "Audit heuristique (critères d'utilisabilité)",
        "Analyse des parcours critiques",
        "Tests utilisateurs sur l'existant",
        "Identification des irritants et quick-wins",
        "Recommandations priorisées"
      ],
      output: "Livrables : rapport d'audit, matrice d'irritants, plan d'amélioration"
    }
  ];

  const approach = [
    "Écoute et compréhension de vos enjeux métier",
    "Collaboration étroite avec vos équipes (métier, produit, technique)",
    "Approche itérative et pragmatique",
    "Focus sur la faisabilité et la valeur business",
    "Documentation claire pour faciliter le passage à la réalisation"
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl mb-6 text-gray-900">
            Services
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            J'interviens sur toutes les phases de conception, de la recherche utilisateur à la livraison de spécifications détaillées. 
            Mon objectif : vous aider à prendre les bonnes décisions et réduire les risques projet.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 md:p-10 rounded border border-gray-200">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl mb-3 text-gray-900">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {service.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm uppercase tracking-wider mb-4 text-gray-500">
                    Activités
                  </h3>
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    {service.output}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl mb-8 text-gray-900">
              Mon approche
            </h2>
            <ul className="space-y-4">
              {approach.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-lg text-gray-700 pt-0.5">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl mb-12 text-gray-900">
            Formats d'intervention
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded border border-gray-200">
              <h3 className="text-xl mb-3 text-gray-900">Mission ponctuelle</h3>
              <p className="text-gray-600 mb-4">
                Audit, recherche, cadrage ou phase de conception sur un périmètre défini.
              </p>
              <p className="text-sm text-gray-500">
                Durée : 1 à 4 semaines
              </p>
            </div>
            <div className="bg-white p-8 rounded border border-gray-200">
              <h3 className="text-xl mb-3 text-gray-900">Accompagnement projet</h3>
              <p className="text-gray-600 mb-4">
                Intervention régulière sur toute la durée du projet, en lien avec vos équipes.
              </p>
              <p className="text-sm text-gray-500">
                Durée : 2 à 6 mois
              </p>
            </div>
            <div className="bg-white p-8 rounded border border-gray-200">
              <h3 className="text-xl mb-3 text-gray-900">Régie / temps partiel</h3>
              <p className="text-gray-600 mb-4">
                Présence récurrente (1 à 3 jours / semaine) pour renforcer votre équipe produit.
              </p>
              <p className="text-sm text-gray-500">
                Durée : selon besoins
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl mb-6 text-gray-900">
              Discutons de votre projet
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Chaque projet est différent. Échangeons sur vos besoins spécifiques pour définir ensemble la meilleure approche.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
              >
                Prendre rendez-vous
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-900 rounded hover:bg-gray-50 transition-colors"
              >
                Envoyer un message
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
