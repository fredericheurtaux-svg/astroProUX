import { Link } from "react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function AuchanOutilsMagasin() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-4 pb-10 md:pt-10">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux études de cas
        </Link>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-8 md:pb-6">
        <div className="max-w-4xl mb-12">
          <p className="text-2xl text-blue-600 mb-6 italic font-medium">Moderniser sans perdre le terrain</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 tracking-tight leading-[1.05]">
            Auchan — Modernisation d'outils magasin
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Introduire l'UX dans un programme de transformation technique et produire vite des résultats 
            utiles pour les équipes en magasin.
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-8 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Durée</p>
            <p className="text-gray-900">9 mois</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Supports</p>
            <p className="text-gray-900">Mobile + Desktop</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Démarche</p>
            <p className="text-gray-900">5 itérations</p>
          </div>
        </div>
      </section>

      {/* Schema Invite */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-sm p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">Si vous aimez les schémas</h3>
              <p className="text-blue-800 leading-relaxed mb-4">
                Découvrez ci-dessous un résumé visuel de cette étude de cas, qui illustre 
                l'approche méthodologique et les résultats clés.
              </p>
              <a 
                href="#schema-resume" 
                className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium"
              >
                Voir le schéma de synthèse
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - 2 Columns Layout */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32">
        <div className="grid lg:grid-cols-13 gap-12 lg:gap-16">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-6 space-y-20">
            
            {/* Contexte */}
            <div>
              <h2 className="text-2xl md:text-3xl mb-6 text-gray-900">Contexte</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                La migration vers GCP était cofinancée par Google à condition d'intégrer une démarche UX structurée. 
                Le responsable métier souhaitait profiter de cette transformation pour repenser les outils à partir 
                des usages réels des équipes terrain.
              </p>
            </div>

            {/* Enjeux */}
            <div>
              <h2 className="text-2xl md:text-3xl mb-6 text-gray-900">Enjeux</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Faire entrer l'UX dans un programme d'abord technique</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Intégrer une approche centrée utilisateur dans un contexte de migration cloud 
                    initialement focalisé sur l'infrastructure.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Répondre à des besoins très concrets en magasin</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Comprendre et adresser les contraintes opérationnelles réelles des équipes terrain 
                    (temps limité, environnement bruyant, mobilité).
                  </p>
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Gérer des utilisateurs peu disponibles</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Travailler avec des collaborateurs en magasin, souvent réticents aux applications 
                    et difficiles à mobiliser pour des tests.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Avancer vite sans sacrifier la qualité du cadrage</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Maintenir un rythme soutenu imposé par le planning de migration tout en gardant 
                    un niveau de recherche et de conception suffisant.
                  </p>
                </div>
              </div>
            </div>

            {/* Mon rôle */}
            <div>
              <h2 className="text-2xl md:text-3xl mb-6 text-gray-900">Mon rôle</h2>
              
              {/* Role Split */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-900 rounded-sm flex items-center justify-center">
                    <span className="text-white text-sm">80%</span>
                  </div>
                  <span className="text-base text-gray-900">Designer</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-400 rounded-sm flex items-center justify-center">
                    <span className="text-white text-sm">20%</span>
                  </div>
                  <span className="text-base text-gray-900">Researcher</span>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Observation terrain, cadrage UX, alignement projet, wireframes, validation technique et coûts, 
                prototypage, tests utilisateurs et accompagnement des développements.
              </p>
            </div>

            {/* Démarche */}
            <div>
              <h2 className="text-2xl md:text-3xl mb-8 text-gray-900">Démarche</h2>
              <div className="space-y-8">
                
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center">
                      <span className="text-white text-base">1</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg md:text-xl mb-2 text-gray-900">
                      Observation terrain
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Immersion en magasin auprès des équipes pour comprendre les contraintes réelles 
                      et les usages quotidiens.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center">
                      <span className="text-white text-base">2</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg md:text-xl mb-2 text-gray-900">
                      Cadrage par l'UX
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Priorisation des besoins et définition des parcours prioritaires à partir 
                      des observations terrain.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center">
                      <span className="text-white text-base">3</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg md:text-xl mb-2 text-gray-900">
                      Alignement projet
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Synchronisation avec les équipes techniques, métier et Google pour valider 
                      la direction et les priorités.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center">
                      <span className="text-white text-base">4</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg md:text-xl mb-2 text-gray-900">
                      Wireframes
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Conception rapide des écrans clés et des parcours principaux pour 
                      valider la structure avant le design détaillé.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center">
                      <span className="text-white text-base">5</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg md:text-xl mb-2 text-gray-900">
                      Validation technique et coûts
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Travail avec les développeurs pour évaluer la faisabilité et arbitrer 
                      entre valeur utilisateur et effort de réalisation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center">
                      <span className="text-white text-base">6</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg md:text-xl mb-2 text-gray-900">
                      Prototypage
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Maquettes interactives testées en magasin pour valider les choix d'interface 
                      et ajuster avant développement.
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center">
                      <span className="text-white text-base">7</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg md:text-xl mb-2 text-gray-900">
                      Accompagnement des développements
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Suivi de la réalisation pour garantir la cohérence et répondre aux questions 
                      d'implémentation.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Résultats */}
            <div>
              <h2 className="text-2xl md:text-3xl mb-8 text-gray-900">Résultats</h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    L'UX intégrée dans un programme de transformation technique
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Des résultats rapidement utiles pour le terrain
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Plusieurs applications préparées pour un déploiement rapide en magasin
                  </p>
                </div>
              </div>
            </div>

            {/* Ce que j'en retiens */}
            <div className="bg-gray-900 p-10 md:p-12 rounded-sm -mx-6 lg:mx-0">
              <h2 className="text-2xl md:text-3xl mb-6 text-white">Ce que j'en retiens</h2>
              <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
                Dans les programmes de transformation, l'UX apporte de la valeur quand elle aide 
                à décider vite, concrètement, et au plus près du terrain.
              </p>
            </div>

          </div>

          {/* Right Column - Illustrations */}
          <div className="lg:col-span-6 space-y-8 lg:sticky lg:top-24 lg:self-start">
            
            <div className="space-y-3">
              <div className="aspect-[16/10] bg-gray-100 rounded-sm overflow-hidden">
                <ImageWithFallback
                  src="/case-studies/Auchan-Observations.png"
                  alt="Observation Interface mobile - Vérification balisage"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Extrait des restitutions d'observations terrain - balisage poissonnerie
              </p>
            </div>

            <div className="space-y-3">
              <div className="aspect-[16/10] bg-gray-100 rounded-sm overflow-hidden">
                <ImageWithFallback
                  src="/case-studies/Auchan-Wireframe.png"
                  alt="Wireframe - Interface Mobile - Balisage réglementaire poissonnerie"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                  Wireframe - Interface Mobile - Balisage réglementaire poissonnerie
              </p>
            </div>

            <div className="space-y-3">
              <div className="aspect-[16/10] bg-gray-100 rounded-sm overflow-hidden">
                <ImageWithFallback
                  src="/case-studies/Auchan-Brief.png"
                  alt="Interface Web Marges - Extrait du brief pour les UI et les développeurs"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                "Interface Web Marges - Extrait du brief pour les UI et les développeurs"
              </p>
            </div>

  

            <div className="bg-gray-50 p-8 rounded-sm">
              <p className="text-sm text-gray-500 mb-4">Applications développées</p>
              <ul className="text-base text-gray-700 leading-relaxed space-y-2">
                <li>• Vérification du balisage des prix</li>
                <li>• Aide à l'implémentation des produits</li>
                <li>• Dons aux associations</li>
                <li>• Traçabilité poissonnerie</li>
                <li>• Vérification des changements de prix</li>
              </ul>
            </div>

          </div>

        </div>
      </section>


      {/* Schema Resume */}
      <section id="schema-resume" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="bg-gray-50 rounded-sm p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">Résumé visuel de l'approche méthodologique et des résultats clés :</h2>
            <p className="text-base text-gray-600">Cliquez sur l'image pour l'ouvrir dans un nouvel onglet.</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-sm p-8 shadow-sm min-h-96 flex items-center justify-center">
              <a href="/case-studies/auchan-outils.svg" target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                <ImageWithFallback
                  src="/case-studies/auchan-outils.svg"
                  alt="Schéma de synthèse - Auchan Outils Magasin"
                  className="w-full h-auto max-h-96 rounded-sm"
                />
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Navigation */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32 pt-12 border-t border-gray-200">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-base text-gray-900 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour aux études de cas
        </Link>
      </section>
    </div>
  );
}