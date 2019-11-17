import { normalizeResult } from './normalizeResult';
import { ScanResultStatus } from '../models/ScanResultStatus';

describe('normalizeResult', () => {
  it('convert all fields', () => {
    const data = {
      id: "1",
      status: "Queued",
      repositoryName: 'someName',
      findings: [],
      queuedAt: '2019-11-10T03:02:23.200Z',
      scanningAt: undefined,
      finishedAt: undefined,
      updatedAt: '2019-11-10T03:02:23.200Z',
    };
    const expected = {
      id: 1,
      status: ScanResultStatus.QUEUED,
      repositoryName: 'someName',
      findings: [],
      queuedAt: new Date('2019-11-10T03:02:23.200Z'),
      scanningAt: undefined,
      finishedAt: undefined,
      updatedAt: new Date('2019-11-10T03:02:23.200Z'),
    };

    const result = normalizeResult(data);

    expect(result).toEqual(expected);
  });
});
