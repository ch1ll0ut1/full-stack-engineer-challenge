import { ScanResultStatus } from "./ScanResultStatus";
import { ScanResultFinding } from "./ScanResultFinding";

export interface ScanResult {
  id: number;
  status: ScanResultStatus;
  repositoryName: string;
  findings: ScanResultFinding[];
  queuedAt: Date;
  scanningAt?: Date;
  finishedAt?: Date;
  updatedAt: Date;
}
