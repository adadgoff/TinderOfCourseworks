import { Approve } from "@/entities/approve";
import { MOCK_ST_CW_APPROVES, MOCK_SV_CW_APPROVES } from "./mock";

export const MOCK_APPROVES: Approve[] = [
  ...MOCK_ST_CW_APPROVES,
  ...MOCK_SV_CW_APPROVES,
];
