import { St2SvCwMatch, Sv2StCwMatch } from "./model";

export enum MatchType {
  SKIP = 0,
  LIKE = 1,
}

export type Match = St2SvCwMatch | Sv2StCwMatch;
