import { UUID } from "@/shared/types";
import { MatchType } from "../match/types";

export interface MatchBase {
  matchedAt?: string;
  type: MatchType;
}

export interface MatchSt2SvCw extends MatchBase {
  stId: UUID;
  svCwId: UUID;
}

export interface MatchStCw2Sv extends MatchBase {
  stCwId: UUID;
  svId: UUID;
}

export interface MatchSv2StCw extends MatchBase {
  svId: UUID;
  stCwId: UUID;
}

export interface MatchSvCw2St extends MatchBase {
  svCwId: UUID;
  stId: UUID;
}

export interface ApproveBase {
  approvedAt: string;
}

export interface ApproveSt2SvCw extends ApproveBase {
  stId: UUID;
  svCwId: UUID;
}

export interface ApproveSv2StCw extends ApproveBase {
  svId: UUID;
  stCwId: UUID;
}
