import { Link } from "react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function SNCFReseauNomadeVigirail() {
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
          <p className="text-sm text-gray-500 mb-4 italic">Le live design pour accélérer</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 tracking-tight leading-[1.05]">
            SNCF Réseau — Nomade / Vigirail
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Comment concevoir des applications mobiles terrain dans un environnement exigeant, 
            sous contrainte de sécurité, de contexte d'usage et de charge cognitive.
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-8 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Durée</p>
            <p className="text-gray-900">12 mois</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Programme</p>
            <p className="text-gray-900">13 applications Android</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Cible</p>
            <p className="text-gray-900">14 000 utilisateurs</p>
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
                Le programme visait à améliorer la sécurité, à simplifier les routines et à mieux tracer 
                les interventions et anomalies. Le contexte d'usage était particulièrement exigeant : 
                extérieur, circulation des trains, population hétérogène, accès verrouillé.
              </p>
            </div>

            {/* Enjeux */}
            <div>
              <h2 className="text-2xl md:text-3xl mb-6 text-gray-900">Enjeux</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Concevoir dans un programme large</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Assurer la cohérence et l'homogénéité de 13 applications mobiles différentes, 
                    utilisées par des métiers variés sur le terrain.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Limiter la charge cognitive sur le terrain</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Concevoir des interfaces simples et rapides à utiliser dans des conditions 
                    de stress et de vigilance liées à la sécurité ferroviaire.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Assurer lisibilité et sécurité en conditions réelles</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Garantir la visibilité des écrans en plein soleil, la manipulation avec des gants, 
                    l'utilisation en mouvement et la robustesse de l'interface.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Faire converger métiers, technique et design</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Animer des ateliers très opérationnels pour aligner rapidement experts métier, 
                    développeurs et designers sur des décisions concrètes.
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
                    <span className="text-white text-sm">95%</span>
                  </div>
                  <span className="text-base text-gray-900">Designer</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-400 rounded-sm flex items-center justify-center">
                    <span className="text-white text-sm">5%</span>
                  </div>
                  <span className="text-base text-gray-900">Researcher</span>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Conception de 3 applications, animation d'ateliers de co-design, rédaction de guidelines mobiles, 
                travail étroit avec le leader technique et le UI designer.
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
                      Live design pendant les ateliers
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Concevoir en direct pendant les ateliers avec les experts métier et les développeurs 
                      pour valider immédiatement la faisabilité et l'alignement, sans passer par des phases 
                      de documentation intermédiaires.
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
                      Observations terrain pour sécuriser les choix
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Accompagner les agents sur le terrain pour comprendre les contraintes réelles : 
                      luminosité, gants, bruit, circulation, protocoles de sécurité et situations d'urgence.
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
                      Interactions innovantes pour réduire la charge cognitive
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Concevoir des interactions spécifiques comme l'annotation photo directe, la saisie 
                      vocale, les raccourcis gestuels et les parcours simplifiés pour les actions critiques.
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
                      Évolution de la charte pour améliorer lisibilité et compatibilité d'usage
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Adapter les guidelines visuelles pour améliorer le contraste, augmenter les zones 
                      tactiles, optimiser la typographie mobile et garantir l'accessibilité en conditions dégradées.
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
                    Meilleure détection et localisation des anomalies grâce aux fonctions de signalement simplifiées
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Collecte d'information simplifiée avec des formulaires courts et des interactions adaptées au mobile
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Homogénéité des applications, réduisant l'effort de formation des 14 000 utilisateurs
                  </p>
                </div>
              </div>
            </div>

            {/* Ce que j'en retiens */}
            <div className="bg-gray-900 p-10 md:p-12 rounded-sm -mx-6 lg:mx-0">
              <h2 className="text-2xl md:text-3xl mb-6 text-white">Ce que j'en retiens</h2>
              <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
                Plus l'environnement est contraint, plus le design doit absorber la complexité d'usage 
                plutôt que la renvoyer à l'utilisateur.
              </p>
            </div>

          </div>

          {/* Right Column - Illustrations */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24 lg:self-start">
            
            {/* Mobile Screenshot 1 */}
            <div className="max-w-[280px] mx-auto">
              <div className="space-y-3">
                <div className="aspect-[9/19] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1766475553400-f4b1e95d8429?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlsd2F5JTIwc2FmZXR5JTIwZXF1aXBtZW50JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzQ1MzMyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Interface mobile Nomade"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed text-center">
                  Interface mobile Nomade
                </p>
              </div>
              <p className="text-sm text-gray-500 text-center mt-3">Application Nomade</p>
            </div>

            {/* Mobile Screenshot 2 */}
            <div className="max-w-[280px] mx-auto">
              <div className="space-y-3">
                <div className="aspect-[9/19] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1766475553400-f4b1e95d8429?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlsd2F5JTIwc2FmZXR5JTIwZXF1aXBtZW50JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzQ1MzMyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Interface mobile Vigirail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed text-center">
                  Interface mobile Vigirail
                </p>
              </div>
              <p className="text-sm text-gray-500 text-center mt-3">Application Vigirail</p>
            </div>

            {/* Guidelines */}
            <div className="bg-gray-50 p-8 rounded-sm">
              <p className="text-sm text-gray-500 mb-4">Guidelines mobiles</p>
              <p className="text-base text-gray-700 leading-relaxed mb-4">
                Rédaction de guidelines spécifiques pour garantir la cohérence des 13 applications 
                du programme.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Zones tactiles minimum 48px</li>
                <li>• Contraste AAA pour lecture extérieure</li>
                <li>• Navigation simplifiée à 2 niveaux max</li>
                <li>• Interactions gestuelles adaptées</li>
              </ul>
            </div>

            {/* Field Photo */}
            <div className="space-y-3">
              <div className="aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1766475553400-f4b1e95d8429?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlsd2F5JTIwc2FmZXR5JTIwZXF1aXBtZW50JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzQ1MzMyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Observation terrain"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Observation terrain
              </p>
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
                src="/case-studies/schema-resume-sncf-nomade.png"
                alt="Schéma de synthèse - SNCF Réseau Nomade Vigirail"
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