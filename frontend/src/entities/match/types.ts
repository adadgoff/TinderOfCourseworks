import { St2SvCwMatch, Sv2StCwMatch } from ".";

export enum MatchType {
  Skip = "skip",
  Like = "like",
}

export type Match = St2SvCwMatch | Sv2StCwMatch;
