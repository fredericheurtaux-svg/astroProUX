import { Link } from "react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export function SNCFReseauRefonte() {
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
          <p className="text-sm text-gray-500 mb-4 italic">Designer la complexité</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900 tracking-tight leading-[1.05]">
            SNCF Réseau — Refonte de 2 applications stratégiques
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            Comment rendre pilotables des outils critiques, fortement contraints par les référentiels, 
            sans alourdir le travail des experts terrain.
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-8 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Durée</p>
            <p className="text-gray-900">15 mois</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Périmètre</p>
            <p className="text-gray-900">2 applications web</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Démarche</p>
            <p className="text-gray-900">15 interviews, ateliers, prototypes détaillés</p>
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
                La mission portait sur deux applications dédiées à la planification budgétaire du renouvellement 
                de l'infrastructure ferroviaire, dans un contexte sensible, après un échec projet récent et avec 
                de fortes contraintes de données de localisation.
              </p>
            </div>

            {/* Enjeux */}
            <div>
              <h2 className="text-2xl md:text-3xl mb-6 text-gray-900">Enjeux</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Passer du papier au digital</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Numériser des processus historiquement gérés sur papier et Excel, 
                    sans créer de rupture dans les pratiques.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Réconcilier plusieurs pratiques terrain</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Harmoniser des méthodes de travail différentes selon les régions 
                    et les métiers.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Sécuriser la conception</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Éviter de dégrader le travail expert en imposant des simplifications 
                    artificielles ou contre-productives.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg mb-2 text-gray-900">Rendre tangible la complexité</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Faire comprendre aux parties prenantes la forte complexité fonctionnelle 
                    sans la masquer.
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
                    <span className="text-white text-sm">50%</span>
                  </div>
                  <span className="text-base text-gray-900">Designer</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-400 rounded-sm flex items-center justify-center">
                    <span className="text-white text-sm">25%</span>
                  </div>
                  <span className="text-base text-gray-900">Researcher</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-300 rounded-sm flex items-center justify-center">
                    <span className="text-gray-700 text-sm">25%</span>
                  </div>
                  <span className="text-base text-gray-900">Négociateur</span>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                Interviews, ateliers, prototypes détaillés, participation aux user stories, suivi rapproché 
                des développements et travail d'alignement entre métier, AMOA et développeurs.
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
                      Cerner les usages implicites des experts
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Aller au-delà des demandes exprimées pour comprendre les pratiques réelles, 
                      les raccourcis mentaux et les savoirs tacites qui structurent le travail quotidien.
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
                      Prototyper la complexité plutôt que la simplifier artificiellement
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Rendre visible et manipulable la richesse fonctionnelle attendue, sans chercher 
                      à tout prix à réduire ou masquer ce qui est nécessaire au métier.
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
                      Challenger certaines injonctions projet contraires aux usages
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Identifier et documenter les écarts entre les spécifications initiales et les besoins 
                      réels, pour négocier des arbitrages éclairés.
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
                      Accompagner AMOA et développeurs jusqu'aux arbitrages concrets
                    </h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Maintenir l'alignement tout au long du développement en participant aux rituels agiles, 
                      en clarifiant les user stories et en validant les choix d'implémentation.
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
                    Levée de trois risques majeurs liés à des incompréhensions entre métier, AMOA et développeurs
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Des prototypes rendant la complexité fonctionnelle tangible et négociable
                  </p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Temps de rédaction des conclusions experts maintenu malgré les nouvelles contraintes
                  </p>
                </div>
              </div>
            </div>

            {/* Ce que j'en retiens */}
            <div className="bg-gray-900 p-10 md:p-12 rounded-sm -mx-6 lg:mx-0">
              <h2 className="text-2xl md:text-3xl mb-6 text-white">Ce que j'en retiens</h2>
              <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
                Quand le sujet est complexe, le rôle du design n'est pas de masquer la complexité, 
                mais de la rendre lisible, négociable et faisable.
              </p>
            </div>

          </div>

          {/* Right Column - Illustrations */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24 lg:self-start">
            
            <div className="aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763048344624-ca11eb6a37c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlsd2F5JTIwdHJhaW4lMjBpbmZyYXN0cnVjdHVyZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc0NTMzMjIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Infrastructure ferroviaire SNCF Réseau"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763048344624-ca11eb6a37c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlsd2F5JTIwdHJhaW4lMjBpbmZyYXN0cnVjdHVyZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc0NTMzMjIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Prototype application 1"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="aspect-[4/3] bg-gray-100 rounded-sm overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1763048344624-ca11eb6a37c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWlsd2F5JTIwdHJhaW4lMjBpbmZyYXN0cnVjdHVyZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc0NTMzMjIyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Prototype application 2"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-gray-50 p-8 rounded-sm">
              <p className="text-sm text-gray-500 mb-4">Note</p>
              <p className="text-base text-gray-700 leading-relaxed">
                Les prototypes ont été conçus avec un niveau de détail élevé pour permettre 
                des échanges précis avec les développeurs et valider la faisabilité technique.
              </p>
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