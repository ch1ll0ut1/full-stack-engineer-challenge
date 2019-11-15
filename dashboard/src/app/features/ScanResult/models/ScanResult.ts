import { ScanResultStatus } from "./ScanResultStatus";
import { ScanResultFindings } from "./ScanResultFindings";

export interface ScanResult {
  id: number;
  status: ScanResultStatus;
  repositoryName: string;
  findings: ScanResultFindings;
  queuedAt: Date;
  scanningAt: Date;
  finishedAt: Date;
  updatedAt: Date;
}
