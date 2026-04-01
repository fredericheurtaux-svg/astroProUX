import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CaseStudies() {
  const cases = [
    {
      id: "sncf-reseau-refonte",
      title: "SNCF Réseau — Refonte de 2 applications stratégiques",
      subtitle: "Designer la complexité",
      keyInfo: ["15 mois", "2 applications web", "15 interviews"],
      promise: "Repenser deux outils critiques de planification budgétaire sans alourdir le travail des experts terrain.",
      imageUrl: "/case-studies/Opipro-SR.jpg",
      size: "large"
    },
    {
      id: "auchan-outils-magasin",
      title: "Auchan — Modernisation d'outils magasin",
      subtitle: "Moderniser sans perdre le terrain",
      keyInfo: ["9 mois", "mobile + desktop", "5 itérations"],
      promise: "Intégrer l'UX dans une transformation technique pour produire vite des résultats utiles aux équipes magasin.",
      imageUrl: "/case-studies/Auchan-Mag.png",
      size: "standard"
    },
    {
      id: "sncf-reseau-nomade-vigirail",
      title: "SNCF Réseau — Nomade / Vigirail",
      subtitle: "Le live design pour accélérer",
      keyInfo: ["12 mois", "13 apps dans le programme", "14 000 utilisateurs"],
      promise: "Concevoir des applications mobiles terrain en environnement exigeant, sous forte contrainte d'usage.",
      imageUrl: "/case-studies/sncf-nomade.svg",
      size: "standard"
    },
    {
      id: "dreal-comfluence",
      title: "DREAL Grand Est — Comfluence",
      subtitle: "Faire de l'UX dans un cadre très contraint",
      keyInfo: ["4 mois 20 jours", "3 ateliers", "mobile + desktop"],
      promise: "Introduire une démarche centrée utilisateur dans un cadre institutionnel, avec peu de temps et peu de marge de manœuvre.",
      imageUrl: "/case-studies/dreal-comfluence.svg",
      size: "large"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 text-gray-900 tracking-tight leading-[1.05]">
            Études de cas
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Quelques missions menées dans des contextes variés, souvent complexes, à l'intersection des usages, 
            du métier et de la faisabilité.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-32">
        <div className="space-y-16 md:space-y-24">
          {cases.map((caseStudy, index) => (
            <Link
              key={caseStudy.id}
              to={`/case-studies/${caseStudy.id}`}
              className="group block"
            >
              <article className={`grid ${caseStudy.size === 'large' ? 'lg:grid-cols-12' : 'lg:grid-cols-12'} gap-8 lg:gap-12 items-start`}>
                
                {/* Image */}
                <div className={`${caseStudy.size === 'large' ? 'lg:col-span-7' : 'lg:col-span-6'} order-1 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className={`${caseStudy.size === 'large' ? 'aspect-[16/10]' : 'aspect-[4/3]'} overflow-hidden bg-gray-100 rounded-sm`}>
                    <ImageWithFallback
                      src={caseStudy.imageUrl}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`${caseStudy.size === 'large' ? 'lg:col-span-5' : 'lg:col-span-6'} order-2 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} ${caseStudy.size === 'large' ? 'lg:pt-8' : 'lg:pt-4'}`}>
                  
                  {/* Subtitle */}
                  <p className="text-sm text-gray-500 mb-4 italic tracking-wide">
                    {caseStudy.subtitle}
                  </p>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl lg:text-4xl mb-6 text-gray-900 leading-tight tracking-tight">
                    {caseStudy.title}
                  </h2>

                  {/* Key Info */}
                  <div className="flex flex-wrap gap-2 mb-8 text-sm text-gray-500">
                    {caseStudy.keyInfo.map((info, idx) => (
                      <span key={idx}>
                        {info}
                        {idx < caseStudy.keyInfo.length - 1 && <span className="ml-2 text-gray-300">·</span>}
                      </span>
                    ))}
                  </div>

                  {/* Promise */}
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                    {caseStudy.promise}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-base text-gray-900 group-hover:gap-3 transition-all">
                    <span>Voir l'étude de cas</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

              </article>

              {/* Separator */}
              {index < cases.length - 1 && (
                <div className="mt-16 md:mt-24 border-t border-gray-200"></div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-8 text-gray-900 leading-tight tracking-tight">
            Vous avez un produit, un parcours ou un outil métier à clarifier ou améliorer ?
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Parlons-en.
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
