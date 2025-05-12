import { StCwApprove, SvCwApprove } from "@/entities/approve";

export const MOCK_ST_CW_APPROVES: StCwApprove[] = [
  new StCwApprove("approve1", "0", "s1", "sup1", new Date(2025, 3, 15)),
  new StCwApprove("approve2", "1", "s2", "sup2", new Date(2025, 2, 28)),
];

export const MOCK_SV_CW_APPROVES: SvCwApprove[] = [
  new SvCwApprove("approve3", "0", "s1", "sup1", new Date(2025, 3, 20)),
  new SvCwApprove("approve4", "2", "s3", "sup3", new Date(2025, 4, 10)),
];
