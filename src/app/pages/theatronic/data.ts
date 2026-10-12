export type Example = {
  title: string;
  videoId: string;
  context: string;
  story: string;
};

// Pour ajouter une vidéo : ajouter une entrée ici (id YouTube, contexte, histoire).
export const examples: Example[] = [
  {
    title: "LOL Game – EPN Ronchin, 2022",
    videoId: "rARqWxk_-Gk",
    context:
      "Créé par cinq enfants, du CM2 à la 4e, à Ronchin. Une revisite de Squid Game avec une dose de Pierre Richard.",
    story: "",
  },
  {
    title: "MuséeTronic – Le vol de la Joconde",
    videoId: "_mZyG1xfxic",
    context:
      "Réalisé dans le cadre d'une résidence dans les Maisons Folie, avec La Villette, par une classe de CM1 d'une école de Lille, en six séances et deux groupes. Une histoire cadrée à partir de tableaux de musée.",
    story: "Le vol de la Joconde.",
  },
];

// Pour ajouter une photo : la déposer dans public/theatronic/ puis ajouter une entrée ici.
export const gallery = [
  { src: "/theatronic/projection-van-gogh.webp", alt: "Le théâtre miniature projeté sur grand écran, avec la chambre de Van Gogh en décor", caption: "Un décor inspiré de Van Gogh, projeté sur grand écran" },
  { src: "/theatronic/mecanisme.webp", alt: "Vue de l'intérieur du théâtre : moteurs, cartes électroniques et rideau rouge dans une structure en bois découpé", caption: "Sous la scène : moteurs, cartes et rideau" },
  { src: "/theatronic/programmation.webp", alt: "Deux jeunes programment le théâtre sur un ordinateur avec des blocs de code visuels", caption: "Programmer la scène avec des blocs visuels" },
  { src: "/theatronic/enregistrement-voix.webp", alt: "Deux jeunes enregistrent les voix des personnages devant un micro, à côté du théâtre en bois", caption: "Enregistrer les voix des personnages" },
];

