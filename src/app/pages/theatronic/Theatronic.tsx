import { Link } from "react-router";
import {
  Drama, ArrowRight, CheckCircle2, PenLine, Scissors, Bot, Users,
  Quote, Compass, Frame, Leaf, BookOpen, MailCheck, Package, BadgeCheck, Headset, Mail, Monitor, Hand,
} from "lucide-react";

import { TheatronicShell } from "./TheatronicShell";
import { ExampleCard } from "./ExampleCard";
import { examples } from "./data";

const infos = [
  { title: "Tranche d'âge", value: "À partir de 8 ans", text: "Conçu pour s'adapter du primaire (CE2) jusqu'au collège sans prérequis technique." },
  { title: "Format de groupe", value: "Demi-classe ou 8 participants en centre social", text: "Favorise l'entraide, le temps de parole et une manipulation sereine des machines." },
  { title: "Temporalité", value: "3 séances minimum", text: "Un cycle complet permettant de mûrir l'écriture, la construction et la restitution finale." },
];

const steps = [
  { n: "01", tag: "Écriture", title: "Imaginer", icon: PenLine, label: "Scénario & dialogues", text: "Inventer un univers, une intrigue et des personnages. Poser sur le papier le décor d'un monde singulier." },
  { n: "02", tag: "Matérialité", title: "Créer", icon: Scissors, label: "Découpage & sons", text: "Ecrire les dialogues et la narration. Fabriquer les décors, dessiner les personnages et enregistrer les voix. Le papier devient une histoire." },
  { n: "03", tag: "Technologie", title: "Programmer", icon: Bot, label: "Moteurs & éclairage", text: "Donner des instructions aux lumières, au rideau et aux personnages à l'aide de commandes simples et visuelles." },
  { n: "04", tag: "Organisation", title: "Coopérer", icon: Users, label: "Spectacle partagé", text: "Répartir les rôles, tester la scène et construire une création commune offerte au regard des autres." },
];

const framings = [
  {
    icon: Compass,
    title: "Histoire libre",
    text: "Aucun cadre imposé : les enfants partent dans toutes les directions et inventent leur propre univers, au gré de leurs idées.",
    examples: [],
  },
  {
    icon: Frame,
    title: "Histoire cadrée",
    text: "On part d'une contrainte initiale qui nourrit l'imaginaire et guide la création des décors et de l'intrigue.",
    examples: [
      { icon: Frame, label: "Des tableaux de musée ou des peintures célèbres comme décors" },
      { icon: Leaf, label: "Une thématique précise, comme l'environnement, un artiste" },
      { icon: BookOpen, label: "Une bande dessinée ou un livre existant à revisiter ou poursuivre" },
    ],
  },
];

const modes = [
  {
    icon: Monitor,
    title: "Représentation autonome",
    text: "Un simple ordinateur suffit pour piloter tout le théâtre : il rejoue la bande son, affiche les décors et déclenche rideaux, personnages et lumières.",
  },
  {
    icon: Hand,
    title: "Représentation interactive",
    text: "C'est au spectateur de jouer : des consignes s'affichent à l'écran et il répond en actionnant lui-même les rideaux, les personnages ou les lumières.",
  },
];

const perks = [
  { icon: MailCheck, text: "Réponse et devis pédagogique sous 48h" },
  { icon: Package, text: "Matériel tout-inclus fourni" },
  { icon: BadgeCheck, text: "Éligibilité Pass Culture en cours" },
  { icon: Headset, text: "Médiateur qualifié dédié" },
];

export function Theatronic() {
  return (
    <TheatronicShell>
      <main>
        {/* Hero */}
        <section id="accueil" className="scroll-mt-20 max-w-6xl mx-auto px-6 pt-10 sm:pt-16 pb-16 sm:pb-20 grid md:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <p className="inline-block px-4 py-1.5 rounded-full bg-[#d2f7f3] text-[#004e4a] text-sm font-bold mb-6">
              Atelier d'éveil robotique & arts de la scène
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight mb-6 text-balance">
              Imagine ton histoire et <span className="text-[#f26430]">donne-lui vie</span>
            </h1>
            <p className="text-base sm:text-lg text-[#546075] mb-8 max-w-xl">
              Avec Théâtronic, les enfants inventent une histoire, fabriquent son univers et programment un véritable
              théâtre miniature robotisé. Chacun peut participer avec ses idées, ses mains et sa créativité.<br /><br />
              Ils ne regardent pas simplement un écran : ils s’en servent pour créer.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#exemples" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f26430] text-white font-bold hover:bg-[#162238] transition-colors">
                Découvrir Théâtronic <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#162238] font-bold hover:bg-[#162238] hover:text-white transition-colors">
                <Drama className="w-5 h-5" aria-hidden="true" /> Organiser un atelier
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#546075]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#0e9488]" aria-hidden="true" />Médiation culturelle clé en main</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#0e9488]" aria-hidden="true" />Usage créatif des écrans</li>
            </ul>
          </div>
          <figure className="w-full max-w-xl mx-auto md:max-w-none rounded-3xl bg-white border-4 border-[#f26430] shadow-xl p-3 sm:p-4">
            <img
              src="/theatronic/schema-theatre.webp"
              alt="Schéma du théâtre : décors sur écran, éclairage par bandes de LED, pixel art, rideaux automatisés et trois personnages en papier découpé, avec un ordinateur et un micro pour la bande son"
              className="w-full h-auto max-h-[28rem] object-contain"
            />
            <figcaption className="mt-3 text-center">
              <span className="block font-extrabold text-xl">Théâtre mécanique & papier découpé</span>
              <span className="block text-sm text-[#546075]">Décors, lumières, rideaux et personnages pilotés par ordinateur</span>
            </figcaption>
          </figure>
        </section>

        {/* L'atelier */}
        <section id="atelier" className="bg-[#f7eedf] py-16 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-bold text-[#f26430] uppercase tracking-wide mb-2">En pratique</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-8">L'atelier</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {infos.map((i) => (
              <div key={i.title} className="bg-white rounded-2xl p-6 border border-[#eddacf]">
                <p className="text-sm font-bold text-[#b36b00] uppercase tracking-wide">{i.title}</p>
                <p className="text-xl font-extrabold my-2">{i.value}</p>
                <p className="text-[#546075]">{i.text}</p>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* Cadrage */}
        <section id="demarche" className="max-w-6xl mx-auto px-6 pt-20 scroll-mt-20">
          <p className="text-sm font-bold text-[#f26430] uppercase tracking-wide mb-2">La démarche · point de départ</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">Deux façons de cadrer l'histoire</h2>
          <p className="text-[#546075] mb-10">
            Chaque atelier peut s'ouvrir sur une page blanche ou partir d'une base commune, selon le projet de la structure.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {framings.map((f) => (
              <article key={f.title} className="rounded-2xl bg-white border border-[#eddacf] p-6 sm:p-8">
                <f.icon className="w-8 h-8 text-[#0e9488] mb-4" aria-hidden="true" />
                <h3 className="text-xl font-extrabold mb-2">{f.title}</h3>
                <p className="text-[#546075]">{f.text}</p>
                {f.examples.length > 0 && (
                  <ul className="mt-5 space-y-3">
                    {f.examples.map((e) => (
                      <li key={e.label} className="flex items-start gap-3 font-semibold">
                        <e.icon className="w-5 h-5 text-[#f26430] mt-0.5 shrink-0" aria-hidden="true" />
                        {e.label}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Démarche */}
        <section id="parcours" className="max-w-6xl mx-auto px-6 pt-16 pb-20 scroll-mt-20">
          <p className="text-sm font-bold text-[#f26430] uppercase tracking-wide mb-2">Méthodologie pas à pas</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">Le parcours créatif</h2>
          <p className="text-[#546075] mb-12">
            Un fil narratif bienveillant où le virtuel sert le tangible, rythmé par quatre moments collectifs complémentaires.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <article key={s.n} className="rounded-2xl bg-white border border-[#eddacf] p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-[#f26430]">{s.n}</span>
                  <s.icon className="w-6 h-6 text-[#0e9488]" aria-hidden="true" />
                </div>
                <p className="text-xs font-bold tracking-widest text-[#546075]">{s.tag.toUpperCase()}</p>
                <h3 className="text-xl font-extrabold">{s.title}</h3>
                <p className="text-[#546075] flex-1">{s.text}</p>
                <p className="text-sm font-bold text-[#004e4a] bg-[#d2f7f3] rounded-full px-3 py-1 self-start">{s.label}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Représentations */}
        <section id="representations" className="max-w-6xl mx-auto px-6 pb-20 scroll-mt-20">
          <p className="text-sm font-bold text-[#f26430] uppercase tracking-wide mb-2">Après l'atelier</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">Des représentations pour le public</h2>
          <p className="text-[#546075] mb-10">
            Les histoires créées peuvent être présentées lors de séances de représentation, sans les enfants aux commandes ni matériel compliqué.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {modes.map((m) => (
              <article key={m.title} className="rounded-2xl bg-white border border-[#eddacf] p-6 sm:p-8">
                <m.icon className="w-8 h-8 text-[#0e9488] mb-4" aria-hidden="true" />
                <h3 className="text-xl font-extrabold mb-2">{m.title}</h3>
                <p className="text-[#546075]">{m.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Exemples */}
        <section id="exemples" className="max-w-6xl mx-auto px-6 pb-20 scroll-mt-20">
          <p className="text-sm font-bold text-[#f26430] uppercase tracking-wide mb-2">Réalisations</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-10">Découvrir Théâtronic</h2>
          <div className="grid gap-12">
            {examples.map((ex) => (
              <ExampleCard key={ex.videoId} ex={ex} />
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/theatronic/galerie"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#162238] text-white font-bold hover:bg-[#f26430] transition-colors"
            >
              Voir plus de photos et d'histoires <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Citation */}
        <section className="bg-[#162238] text-white py-20">
          <figure className="max-w-3xl mx-auto px-6 text-center">
            <Quote className="w-10 h-10 mx-auto mb-6 text-[#ffb703]" aria-hidden="true" />
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-bold leading-snug">
              Ici, il n'y a pas une seule façon de participer. On peut écrire, dessiner, construire, jouer, sonoriser ou
              mettre en scène par la programmation.
            </blockquote>
            <figcaption className="mt-6 text-[#ffb703] font-bold">La philosophie d'inclusion Théâtronic</figcaption>
          </figure>
        </section>

        {/* Structures / contact */}
        <section id="structures" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
          <div id="contact" className="rounded-3xl bg-[#f7eedf] border border-[#eddacf] p-6 sm:p-8 lg:p-12 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-bold text-[#f26430] uppercase tracking-wide mb-2">
                Médiathèques, centres sociaux, tiers-lieux & écoles
              </p>
              <h2 className="text-3xl font-extrabold mb-4">Construisons une histoire avec votre groupe</h2>
              <p className="text-[#546075] mb-6">
                Théâtronic s'adapte aux projets jeunesse, aux écoles et collèges, aux centres sociaux, aux médiathèques, aux Maisons Folie et aux
                programmations qui souhaitent rapprocher création artistique et culture numérique.
              </p>
              <a
                href="mailto:frederic.heurtaux@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#162238] text-white font-bold hover:bg-[#f26430] transition-colors"
              >
                <Mail className="w-5 h-5" aria-hidden="true" /> Échanger sur un projet
              </a>
            </div>
            <ul className="grid gap-4">
              {perks.map((p) => (
                <li key={p.text} className="flex items-center gap-4 bg-white rounded-2xl p-4 font-semibold">
                  <p.icon className="w-6 h-6 text-[#0e9488] shrink-0" aria-hidden="true" />
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </TheatronicShell>
  );
}
