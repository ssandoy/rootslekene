import { Contestant, Result } from "../../firebase/types";

export const getContestantPoints =
  (result: Result[]) => (contestantId: Pick<Contestant, "id">) =>
    result.find((result) => result.contestantId === contestantId.id)?.points ??
    0;

export interface LeaderboardContestant extends Contestant {
  totalPoints: number;
}

export const sortLeaderboardContestants = (
  contestants: LeaderboardContestant[]
) =>
  contestants.sort(
    (contestantA, contestantB) => contestantA.id - contestantB.id
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
