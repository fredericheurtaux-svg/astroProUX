import { Link } from "react-router";
import { ArrowRight, Award, Users, Layers, Network, Compass, Layout, Users2, GraduationCap, MessageCircle } from "lucide-react";
import { SNCFLogo, AuchanLogo, AdeoLogo, DrealLogo, AxaLogo, MatmutLogo, MCommeMutuelleLogo, LeroyMerlinLogo } from "../components/ClientLogos";

export function Home() {
  const strengths = [
    {
      icon: Award,
      title: "Expérimenté",
      description: "25 ans d'expérience dans le monde de l'entreprise, sur des projets digitaux et IT, avec une bonne compréhension des différents points de vue : ESN, éditeur et client final."
    },
    {
      icon: Users,
      title: "Pédagogue et animateur",
      description: "Enseignant en UX Research, habitué à transmettre, structurer et animer auprès de publics variés, avec une attention particulière à la clarté, à l'engagement et à l'adaptation au niveau de chacun."
    },
    {
      icon: Layers,
      title: "Polyvalent et flexible",
      description: "J'interviens dans des contextes très différents, du grand groupe à la petite entreprise, dans des cadres déjà structurés ou à construire avec les équipes."
    },
    {
      icon: Network,
      title: "À l'aise avec la complexité",
      description: "Habitué aux applications de back-office, aux sujets fonctionnellement complexes et aux environnements SI imbriqués, je sais clarifier les problèmes pour aider à concevoir, décider et avancer."
    }
  ];

  const services = [
    {
      icon: Compass,
      title: "Conseil & cadrage UX",
      description: "J'aide les équipes à repartir des usages réels, à clarifier les besoins et à orienter leurs efforts sur des sujets à forte valeur."
    },
    {
      icon: Layout,
      title: "Recherche & conception UX",
      description: "J'analyse les usages, structure les parcours et conçois des interfaces utiles, cohérentes et faisables."
    },
    {
      icon: Users2,
      title: "Ateliers & facilitation",
      description: "J'anime des temps de cadrage, d'idéation ou de co-conception pour faire avancer les équipes de manière concrète."
    },
    {
      icon: GraduationCap,
      title: "Formation & transmission",
      description: "J'enseigne l'UX Research et j'accompagne des publics variés dans l'appropriation de méthodes et de pratiques UX."
    }
  ];

  const approach = [
    {
      title: "Immersion terrain",
      description: "Aller voir les utilisateurs dans leur contexte pour comprendre les usages réels, pas les usages fantasmés."
    },
    {
      title: "Cadrage rigoureux",
      description: "Poser les bonnes questions, formaliser les objectifs, prioriser ce qui compte vraiment."
    },
    {
      title: "Conception pragmatique",
      description: "Proposer des solutions qui tiennent compte des contraintes techniques, budgétaires et organisationnelles."
    },
    {
      title: "Documentation claire",
      description: "Produire des livrables exploitables qui facilitent la décision et le passage au développement."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-4xl">
          <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
            <h1 className="text-4xl md:text-5xl mb-6 text-gray-900">
               UX designer freelance, 
            </h1> 
            <p>je collabore avec les entreprises pour concevoir des produits numériques utiles et intuitifs, 
               en articulant besoins utilisateurs, enjeux métier et contraintes de faisabilité.
            </p>
            <p>
              Spécialisée dans les contextes complexes : applications métier, outils internes, 
              back-office, transformation digitale.
            </p>
            <p>
             J'accompagne actuellement la startup <a href="https://freshdata.fr" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-gray-700 underline">FreshData</a>. Je suis disponible 3j/sem.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link
              to="/appointment"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white text-base rounded hover:bg-gray-800 transition-colors"
            >
              Prendre rendez-vous
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-900 text-gray-900 text-base rounded hover:bg-gray-50 transition-colors"
            >
              Me contacter
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-700 text-base rounded hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              En savoir plus sur moi
            </Link>
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section className="py-20 md:py-28 bg-gray-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {strengths.map((strength, index) => {
              const Icon = strength.icon;
              return (
                <div key={index} className="bg-white p-8 md:p-10 rounded-sm">
                  <div className="mb-6">
                    <Icon className="w-8 h-8 text-gray-900 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl md:text-2xl mb-4 text-gray-900">
                    {strength.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {strength.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl mb-6 text-gray-900 leading-tight">
              Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="border border-gray-200 p-8 md:p-10 rounded-sm">
                  <div className="mb-6">
                    <Icon className="w-8 h-8 text-gray-900 stroke-[1.5]" />
                  </div>
                  <h3 className="text-xl md:text-2xl mb-4 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 pt-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-lg text-gray-900 hover:gap-3 transition-all"
            >
              Voir le détail des services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Client References Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900 leading-tight">
              Ils m'ont fait confiance
            </h2>
            <p className="text-lg text-gray-600">
              Grands groupes, retail, assurance, mutuelle et secteur public
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12 items-center justify-items-center">
            <div className="text-gray-800 opacity-80 hover:opacity-100 transition-opacity">
              <SNCFLogo />
            </div>
            <div className="text-gray-800 opacity-80 hover:opacity-100 transition-opacity">
              <AuchanLogo />
            </div>
            <div className="text-gray-800 opacity-80 hover:opacity-100 transition-opacity">
              <AdeoLogo />
            </div>
            <div className="text-gray-800 opacity-80 hover:opacity-100 transition-opacity">
              <DrealLogo />
            </div>
            <div className="text-gray-800 opacity-80 hover:opacity-100 transition-opacity">
              <AxaLogo />
            </div>
            <div className="text-gray-800 opacity-80 hover:opacity-100 transition-opacity">
              <MatmutLogo />
            </div>
            <div className="text-gray-800 opacity-80 hover:opacity-100 transition-opacity">
              <MCommeMutuelleLogo />
            </div>
            <div className="text-gray-800 opacity-80 hover:opacity-100 transition-opacity">
              <LeroyMerlinLogo />
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl mb-6 text-gray-900 leading-tight">
              Approche de travail
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              Une méthode structurée mais adaptable, centrée sur la compréhension des usages réels 
              et la prise en compte des contraintes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {approach.map((item, index) => (
              <div key={index}>
                <h3 className="text-xl md:text-2xl mb-4 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8">
            <Link
              to="/methods"
              className="inline-flex items-center gap-2 text-lg text-gray-900 hover:gap-3 transition-all"
            >
              Découvrir mes méthodes de travail
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}