import { ScanResult } from '../models/ScanResult';

export const normalizeResult = (data: any): ScanResult => {
  return {
    id: parseInt(data.id, 10),
    status: data.status,
    repositoryName: data.repositoryName,
    findings: data.findings,
    queuedAt: new Date(data.queuedAt),
    scanningAt: data.scanningAt && new Date(data.scanningAt),
    finishedAt: data.finishedAt && new Date(data.finishedAt),
    updatedAt: new Date(data.updatedAt),
  };
};
