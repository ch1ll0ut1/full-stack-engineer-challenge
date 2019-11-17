import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../services/useScanResultService');

import DetailView from './DetailView';
import { ScanResultStatus } from '../models/ScanResultStatus';
import useScanResultService from '../services/useScanResultService';

const useScanResultServiceMock = useScanResultService as jest.Mock<ReturnType<typeof useScanResultService>>;

const mockedScanResult = {
  id: 1,
  status: ScanResultStatus.QUEUED,
  repositoryName: 'someName',
  findings: [],
  queuedAt: new Date('2019-11-10T03:02:23.200Z'),
  scanningAt: undefined,
  finishedAt: undefined,
  updatedAt: new Date('2019-11-10T03:02:23.200Z'),
};

describe('DetailView', () => {
  beforeEach(() => jest.resetAllMocks());

  it('renders loading state', () => {
    useScanResultServiceMock.mockReturnValue({
      status: 'loading',
    });

    expect(renderer.create(<BrowserRouter><DetailView /></BrowserRouter>).toJSON()).toMatchSnapshot();
  });

  it('renders loaded state', () => {
    useScanResultServiceMock.mockReturnValue({
      status: 'loaded',
      payload: mockedScanResult,
    });

    expect(renderer.create(<BrowserRouter><DetailView /></BrowserRouter>).toJSON()).toMatchSnapshot();
  });

  it('renders error state', () => {
    useScanResultServiceMock.mockReturnValue({
      status: 'error',
      error: new Error('some error'),
    });

    expect(renderer.create(<BrowserRouter><DetailView /></BrowserRouter>).toJSON()).toMatchSnapshot();
  });

});
