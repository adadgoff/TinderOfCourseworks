import { Match } from "@/entities/match";
import { MOCK_ST2SV_CW_MATCHES, MOCK_SV2ST_CW_MATCHES } from "./mock";

export const MOCK_MATCHES: Match[] = [
  ...MOCK_ST2SV_CW_MATCHES,
  ...MOCK_SV2ST_CW_MATCHES,
];
