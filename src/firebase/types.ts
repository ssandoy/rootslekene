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
  tournament?: Tournament;
};

type Participant = {
  name: string;
  isWinner?: boolean;
  resultText?: string | null;
};

export type Game = {
  contestantA: Participant;
  contestantB: Participant;
  result?: string;
  winner?: Participant;
  id: number;
  nextMatchId: number | null;
};

type Tournament = {
  description?: string; // todo not needed?
  games: Game[];
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
  lastYearPlacement?: number;
  expectedPromille?: number;
};
