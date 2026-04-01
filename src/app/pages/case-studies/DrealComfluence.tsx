import { Link } from "react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function DrealComfluence() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12 md:pt-32">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux études de cas
        </Link>
      </section>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20 md:pb-28">
        <div className="max-w-4xl mb-12">
          <p className="text-sm text-gray-500 mb-4 italic">Faire de l'UX dans un cadre très contraint</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 tracking-tight leading-[1.05]">
            DREAL Grand Est — Comfluence
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Introduire une démarche centrée utilisateur dans une organisation peu familière avec l'UX, 
            avec un budget limité et peu de marge de manœuvre.
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-8 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Durée</p>
            <p className="text-gray-900">4 mois 20 jours</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Ateliers</p>
            <p className="text-gray-900">3 ateliers</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Supports</p>
            <p className="text-gray-900">Mobile + Desktop</p>
          </div>
        </div>
      </section>

      {/* Schema Invite */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
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
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-7 space-y-20">
            
            {/* Contexte */}
            <div>
              <h2 className="text-2xl md:text-3xl mb-6 text-gray-900">Contexte</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                La mission visait à améliorer les conditions de travail des inspecteurs des polices de l'eau 
                et de la publicité en facilitant le géoréférencement et les procédures de contrôle. Le contexte 
                était fortement contraint : budget limité, trois ateliers d'une journée maximum avec une vingtaine 
                de personnes, agilité impossible.
              </p>
            </div>

            {/* Enjeux */}
            <div>
              <h2 className="text-2xl md:text-3xl mb-6 text-gray-900">Enjeux</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Faire accepter l'UX dans un cadre institutionnel</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Introduire une démarche centrée utilisateur dans une organisation habituée à des processus 
                    descendants, avec des acteurs peu familiers avec l'UX.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Produire des solutions réalistes dans un temps court</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Cadrer, concevoir et valider des solutions en 4 mois et 20 jours, avec seulement 
                    trois ateliers d'une journée pour aligner toutes les parties prenantes.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Couvrir cas nominaux et exceptions</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Concevoir des parcours qui fonctionnent pour les usages fréquents tout en gérant 
                    les exceptions réglementaires et les cas particuliers métier.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Assurer un transfert propre vers la réalisation</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Documenter et transmettre les choix de conception de façon claire et actionnable 
                    pour une équipe de réalisation externe.
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
                    <span className="text-white text-sm">75%</span>
                  </div>
                  <span className="text-base text-gray-900">Lead Designer</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-400 rounded-sm flex items-center justify-center">
                    <span className="text-white text-sm">25%</span>
                  </div>
                  <span className="text-base text-gray-900">Researcher</span>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Réunion de lancement, interviews, observation, tests, ateliers, prototypage rapide, 
                structuration de l'information, encadrement d'un UI junior, finalisation des prototypes.
              </p>
            </div>

            {/* Démarche */}
            <div>
              <h2 className="text-2xl md:text-3xl mb-8 text-gray-900">Démarche</h2>
              <div className="space-y-10">
                
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-900 rounded-sm flex items-center justify-center">
                      <span className="text-white text-base">1</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg md:text-xl mb-3 text-gray-900">
                      Alignement de la démarche
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Cadrage initial avec les parties prenantes pour expliquer l'approche UX, définir 
                      les attendus de chaque atelier et créer un calendrier réaliste malgré les contraintes.
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
                    <h3 className="text-lg md:text-xl mb-3 text-gray-900">
                      Recherche et modélisation de l'existant
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Interviews des inspecteurs, observation des procédures de contrôle, cartographie 
                      des processus existants et identification des irritants principaux.
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
                    <h3 className="text-lg md:text-xl mb-3 text-gray-900">
                      Trois ateliers successifs intensifs
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Atelier 1 : Esquisser les parcours prioritaires et valider la direction générale.<br />
                      Atelier 2 : Sécuriser les cas nominaux avec des prototypes papier et digitaux.<br />
                      Atelier 3 : Intégrer les exceptions, arbitrer et finaliser les spécifications.
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
                    <h3 className="text-lg md:text-xl mb-3 text-gray-900">
                      Finalisation et transfert
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Prototypes haute fidélité, documentation des parcours et des règles métier, 
                      passation avec l'équipe de réalisation et tests de validation finale.
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
                    Solutions concrètes pour les principaux irritants identifiés par les inspecteurs
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Renoncements assumés par les acteurs, avec une priorisation claire des fonctionnalités
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Design compatible avec les budgets de réalisation et les contraintes techniques
                  </p>
                </div>
              </div>
            </div>

            {/* Ce que j'en retiens */}
            <div className="bg-gray-900 p-10 md:p-12 rounded-sm -mx-6 lg:mx-0">
              <h2 className="text-2xl md:text-3xl mb-6 text-white">Ce que j'en retiens</h2>
              <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
                Quand l'agilité n'est pas possible, il faut concentrer la valeur UX dans quelques 
                moments collectifs très bien préparés.
              </p>
            </div>

          </div>

          {/* Right Column - Illustrations */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24 lg:self-start">
            
            {/* Workshop Photo */}
            <div className="space-y-3">
              <div className="aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc2hvcCUyMHRlYW0lMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc3NDUzMzIyNHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Atelier collaboratif"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Atelier collaboratif
              </p>
            </div>

            {/* Workshop Info Box */}
            <div className="bg-gray-50 p-8 rounded-sm">
              <p className="text-sm text-gray-500 mb-4">Les 3 ateliers</p>
              <div className="space-y-3 text-base text-gray-700 leading-relaxed">
                <p><strong>Atelier 1 :</strong> Esquisse et validation de la direction</p>
                <p><strong>Atelier 2 :</strong> Sécurisation des cas nominaux</p>
                <p><strong>Atelier 3 :</strong> Intégration des exceptions</p>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                ~20 participants par atelier (inspecteurs, responsables métier, SI, direction)
              </p>
            </div>

            {/* Paper Prototype */}
            <div className="space-y-3">
              <div className="aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMHByb3RvdHlwZSUyMHNrZXRjaHxlbnwxfHx8fDE3NzQ1MzMyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Prototypage papier"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Prototypage papier
              </p>
            </div>

            {/* Desktop Interface */}
            <div className="space-y-3">
              <div className="aspect-[16/10] bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1656740978179-91ed1b1e745b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwd2F0ZXIlMjByaXZlciUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzQ1MzMyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Interface desktop Comfluence"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Interface desktop Comfluence
              </p>
            </div>

            {/* Mobile Interface */}
            <div className="max-w-[280px] mx-auto">
              <div className="space-y-3">
                <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden shadow-md border border-gray-200">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1656740978179-91ed1b1e745b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwd2F0ZXIlMjByaXZlciUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzQ1MzMyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Interface mobile Comfluence"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed text-center">
                  Interface mobile Comfluence
                </p>
              </div>
              <p className="text-sm text-gray-500 text-center mt-3">Version mobile pour les inspecteurs terrain</p>
            </div>

          </div>

        </div>
      </section>

      {/* Schema Resume */}
      <section id="schema-resume" className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="bg-gray-50 rounded-sm p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl text-gray-900 mb-4">Schéma de synthèse</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Résumé visuel de l'approche méthodologique et des résultats clés de cette étude de cas
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-sm p-8 shadow-sm">
              <ImageWithFallback
                src="/case-studies/schema-resume-dreal.png"
                alt="Schéma de synthèse - DREAL Comfluence"
                className="w-full h-auto rounded-sm"
              />
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