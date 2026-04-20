import { Link } from "react-router";
import { ArrowRight, Briefcase, GraduationCap, Award } from "lucide-react";

export function About() {
  const experience = [
    {
      period: "2015 - Présent",
      role: "UX Designer & UX Researcher freelance",
      description: "Bascule progressive vers l’UX, d’abord dans des environnements de transformation SI complexes, puis comme consultant senior indépendant"
    },
    {
      period: "2005 - 2015",
      role: "UX Designer senior – Business Analyst",
      description: "Évolution vers des rôles de consultant senior, responsable d’offres et d’accompagnement de projets de transformation documentaire et workflow. De plus en plus de contextes grands comptes à articuler enjeux métier, organisation et solutions numériques."
    },
    {
      period: "avant 2005",
      role: "Developpeur, chef de projet GED/Workflow/BPM",
      description: "Numérisation de procesDébuts comme ingénieur d’études puis expert BPM/GED, avec une forte dose de conception et de réalisation d’applications métiers, de dématérialisation. Cette période construit son socle technique et fonctionnel sur des projets complexes dans le public et le privé.sus métier."
    }
  ];

  const education = [
    {
      year: "1995",
      degree: "Master Génie Informatique",
      school: "Université de Grenoble"
    }
  ];

  const certifications = [
    "2023 - Certificaiton B2 anglais (Learning 360))",
    "2021 - Eco-conception numérique (GreenIT)",
    "2017 - UI Design (Usabilis)",
    "2016 - UX Design (Usabilis)"
  ];

  const sectors = [
    "Assurance et Banque",
    "Retail et e-commerce",
    "Secteur publique"
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl mb-6 text-gray-900">
            UX research pour applications métier
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            UX Designer senior et freelance depuis 2015, j'accompagne les entreprises dans la conception de produits numériques utiles et utilisables.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Mon parcours m'a amené à travailler sur des projets très variés, souvent complexes : applications métier, back-office, outils internes, plateformes B2B. 
            Des contextes où la compréhension fine des usages et des contraintes est déterminante.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl mb-8 text-gray-900">
            Ma vision de l'UX
          </h2>
          <div className="max-w-3xl space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Le design UX n'est pas une question d'esthétique ou de tendances, mais de <strong className="text-gray-900">résolution de problèmes</strong>. 
              Mon rôle est de m'assurer que les produits conçus répondent aux vrais besoins des utilisateurs tout en servant les objectifs business.
            </p>
            <p>
              Je crois à une approche <strong className="text-gray-900">pragmatique et collaborative</strong> : 
              partir du terrain, impliquer les parties prenantes, itérer rapidement, documenter clairement. 
              Pas de jargon inutile, pas d'effets de manche.
            </p>
            <p>
              Mon objectif : vous aider à <strong className="text-gray-900">prendre les bonnes décisions</strong> en phase de conception, 
              pour éviter les erreurs coûteuses en phase de développement.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl text-gray-900">
              Parcours professionnel
            </h2>
          </div>

          <div className="space-y-10 max-w-4xl">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-8">
                <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                <h3 className="text-xl mb-3 text-gray-900">{exp.role}</h3>
                <p className="text-gray-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl text-gray-900">
                  Formation
                </h2>
              </div>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index}>
                    <p className="text-sm text-gray-500 mb-1">{edu.year}</p>
                    <h3 className="text-lg mb-1 text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gray-900 rounded flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl text-gray-900">
                  Certifications
                </h2>
              </div>
              <ul className="space-y-4">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl mb-8 text-gray-900">
            Secteurs d'activité
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl">
            J'ai eu l'occasion d'intervenir dans des domaines variés, ce qui me permet de m'adapter rapidement à de nouveaux contextes métier.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
            {sectors.map((sector, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded">
                <p className="text-gray-900">{sector}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Summary 
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl mb-8 text-gray-900">
            En résumé
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
            <div className="text-center">
              <p className="text-4xl mb-2 text-gray-900">15+</p>
              <p className="text-gray-600">Ans d'expérience</p>
            </div>
            <div className="text-center">
              <p className="text-4xl mb-2 text-gray-900">50+</p>
              <p className="text-gray-600">Projets menés</p>
            </div>
            <div className="text-center">
              <p className="text-4xl mb-2 text-gray-900">20+</p>
              <p className="text-gray-600">Clients accompagnés</p>
            </div>
          </div>
        </div>
      </section>
      */} 

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl mb-6 text-gray-900">
              Envie d'en savoir plus ?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Je serais ravie de vous présenter plus en détail mon parcours et mes références lors d'un premier échange.
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
