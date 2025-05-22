import { UUID } from "@/shared/types";

export interface RecBase {}

export interface RecSt extends RecBase {
  stId: UUID;
}

export interface RecStCw extends RecBase {
  stCwId: UUID;
}

export interface RecSv extends RecBase {
  svId: UUID;
}
export interface RecSvCw extends RecBase {
  svCwId: UUID;
}
