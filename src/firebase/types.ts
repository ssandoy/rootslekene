export type Competition = {
  id: string;
  order: number;
  name: string;
  description: string;
  icon: string;
  info?: string;
  bookieFavorite?: string;
  subCompetition?: Pick<Competition, "order" | "name" | "description">[];
  results: Result[];
};

export type Result = {
  contestantId: number;
  points: number;
};

export type Contestant = {
  id: number;
  name: string;
  shortName: string;
  age: number;
  strength: string;
  weakness: string;
};
