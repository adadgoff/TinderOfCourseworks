import { St2SvCwMatch, Sv2StCwMatch } from "@/entities/match";
import { MOCK_COURSEWORKS } from "../courseworks";
import { MOCK_STUDENTS } from "../students";
import { MOCK_SUPERVISORS } from "../supervisors";
import { MatchType } from "@/entities/match/types";

export const MOCK_ST2SV_CW_MATCHES: St2SvCwMatch[] = [
  new St2SvCwMatch(
    "match1",
    MOCK_STUDENTS[0].id,
    `${MOCK_SUPERVISORS[0].id}_${MOCK_COURSEWORKS[0].id}`,
    new Date("2024-03-15T10:00:00"),
    MatchType.LIKE,
  ),
  new St2SvCwMatch(
    "match2",
    MOCK_STUDENTS[1].id,
    `${MOCK_SUPERVISORS[1].id}_${MOCK_COURSEWORKS[1].id}`,
    new Date("2024-02-20T14:30:00"),
    MatchType.SKIP,
  ),
  new St2SvCwMatch(
    "match3",
    MOCK_STUDENTS[2].id,
    `${MOCK_SUPERVISORS[2].id}_${MOCK_COURSEWORKS[2].id}`,
    new Date("2024-01-10T09:15:00"),
    MatchType.LIKE,
  ),
];

export const MOCK_SV2ST_CW_MATCHES: Sv2StCwMatch[] = [
  new Sv2StCwMatch(
    "match4",
    MOCK_SUPERVISORS[0].id,
    `${MOCK_STUDENTS[1].id}_${MOCK_COURSEWORKS[0].id}`,
    new Date("2024-03-18T11:20:00"),
    MatchType.LIKE,
  ),
  new Sv2StCwMatch(
    "match5",
    MOCK_SUPERVISORS[1].id,
    `${MOCK_STUDENTS[2].id}_${MOCK_COURSEWORKS[1].id}`,
    new Date("2024-02-25T16:45:00"),
    MatchType.SKIP,
  ),
  new Sv2StCwMatch(
    "match6",
    MOCK_SUPERVISORS[2].id,
    `${MOCK_STUDENTS[0].id}_${MOCK_COURSEWORKS[2].id}`,
    new Date("2024-01-15T13:10:00"),
    MatchType.LIKE,
  ),
];
