export type Partenaire = {
  nom: string;
  sous: string;
};

export type PartenairesCopy = {
  eyebrow: string;
  titleBefore: string;
  titleAccent: string;
  body: string;
  enterTitle: string;
  exitTitle: string;
  legendEnterTitle: string;
  legendEnterBody: string;
  legendExitTitle: string;
  legendExitBody: string;
  enter: Partenaire[];
  exit: Partenaire[];
};
