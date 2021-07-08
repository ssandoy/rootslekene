export type Competition = {
  id: string;
  name: string;
  results: Result[];
};

export type Result = {
  contestantId: number;
  contestantName: string;
  placement: number;
  points: number;
};
