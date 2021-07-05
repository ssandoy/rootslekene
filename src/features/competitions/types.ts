export type CompetitionType = {
  order: number;
  name: string;
  description: string;
  info?: string;
  bookieFavorite?: string;
  subCompetition?: CompetitionType[];
};
