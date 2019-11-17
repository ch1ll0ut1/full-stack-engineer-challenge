export interface ScanResultFinding {
  type: string;
  ruleId: string;
  location: Location;
  metadata: Metadata;
}

interface Location {
  path: string;
  positions: {
    begin: {
      line: number;
    }
  }
}

interface Metadata {
  severity: string;
  description: string;
}