import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../services/useScanResultsService');

import ListView from './ListView';
import { ScanResultStatus } from '../models/ScanResultStatus';
import useScanResultsService from '../services/useScanResultsService';

const useScanResultsServiceMock = useScanResultsService as jest.Mock<ReturnType<typeof useScanResultsService>>;


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

describe('ListView', () => {
  beforeEach(() => jest.resetAllMocks());

  it('renders loading state', () => {
    useScanResultsServiceMock.mockReturnValue({
      status: 'loading',
    });

    expect(renderer.create(<BrowserRouter><ListView /></BrowserRouter>).toJSON()).toMatchSnapshot();
  });

  it('renders loaded state', () => {
    useScanResultsServiceMock.mockReturnValue({
      status: 'loaded',
      payload: [mockedScanResult]
    });

    expect(renderer.create(<BrowserRouter><ListView /></BrowserRouter>).toJSON()).toMatchSnapshot();
  });

  it('renders error state', () => {
    useScanResultsServiceMock.mockReturnValue({
      status: 'error',
      error: new Error('some error'),
    });

    expect(renderer.create(<BrowserRouter><ListView /></BrowserRouter>).toJSON()).toMatchSnapshot();
  });

});
