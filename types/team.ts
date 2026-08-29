export type TeamSocialKind =
  | "linkedin"
  | "x"
  | "instagram"
  | "github"
  | "email";

export type TeamSocial = {
  kind: TeamSocialKind;
  /** Lien réel — si absent / "#" l’icône n’est pas affichée. */
  href: string;
  label: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  roleBack: string;
  bio: string;
  photo: string;
  /** Uniquement les réseaux renseignés sont affichés (face avant + verso). */
  socials: TeamSocial[];
  featured?: boolean;
};

export type TeamCopy = {
  title: string;
  subtitle: string;
  members: TeamMember[];
};
