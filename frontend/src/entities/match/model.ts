/* 
    Cw <=> Coursework.    
    St <=> Student.
    Sv <=> Supervisor.
 */

import { MatchType } from "./types";

export class St2SvCwMatch {
  constructor(
    public readonly id: string,
    public readonly stId: string,
    public readonly svCwId: string,
    public readonly createdAt: Date,
    public readonly type: MatchType,
  ) {}
}

export class Sv2StCwMatch {
  constructor(
    public readonly id: string,
    public readonly svId: string,
    public readonly stCwId: string,
    public readonly createdAt: Date,
    public readonly type: MatchType,
  ) {}
}
