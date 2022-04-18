import { Competition, Contestant, Result } from "../../firebase/types";

export const getContestantPoints =
  (result: Result[]) => (contestant: Pick<Contestant, "id">) =>
    result.find((result) => result.contestantId === contestant.id)?.points ?? 0;

type SingleResultWithIcon = {
  competitionId: string;
  contestantId: number;
  icon: string;
  points: number;
};

export const getContestantResults =
  (competitions: Competition[]) =>
  (contestant: Pick<Contestant, "id">): SingleResultWithIcon[] =>
    competitions.reduce((acc, currentValue) => {
      const givenRes = currentValue.results?.find(
        (r) => r.contestantId === contestant.id
      );
      const res: SingleResultWithIcon = {
        icon: currentValue.icon,
        competitionId: currentValue.id,
        contestantId: contestant.id,
        points: givenRes?.points ?? 0,
      };
      return [...acc, res];
    }, [] as SingleResultWithIcon[]);

export interface LeaderboardContestant extends Contestant {
  totalPoints: number;
}

export const sortLeaderboardContestants = (
  contestants: LeaderboardContestant[]
) =>
  contestants.sort(
    (contestantA, contestantB) =>
      contestantB.totalPoints - contestantA.totalPoints
  );

export const getLeaderboardTopScorer = (contestants: LeaderboardContestant[]) =>
  contestants.reduce(
    (topScorer, currContestant) => {
      if (currContestant.totalPoints > topScorer.totalPoints) {
        return currContestant;
      }
      return topScorer;
    },
    { totalPoints: 0 } as LeaderboardContestant
  );
