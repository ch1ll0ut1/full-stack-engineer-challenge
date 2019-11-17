import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../services/usePostScanResultService');

import CreateView from './CreateView';
import { ScanResultStatus } from '../models/ScanResultStatus';
import usePostScanResultService from '../services/usePostScanResultService';

const usePostScanResultServiceMock = usePostScanResultService as jest.Mock<ReturnType<typeof usePostScanResultService>>;


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

describe('CreateView', () => {
  beforeEach(() => jest.resetAllMocks());

  it('renders loading state', () => {
    usePostScanResultServiceMock.mockReturnValue({
      status: 'loading',
    });

    expect(renderer.create(<BrowserRouter><CreateView /></BrowserRouter>).toJSON()).toMatchSnapshot();
  });

  it('renders loaded state', () => {
    usePostScanResultServiceMock.mockReturnValue({
      status: 'loaded',
      payload: mockedScanResult
    });

    expect(renderer.create(<BrowserRouter><CreateView /></BrowserRouter>).toJSON()).toMatchSnapshot();
  });

  it('renders error state', () => {
    usePostScanResultServiceMock.mockReturnValue({
      status: 'error',
      error: new Error('some error'),
    });

    expect(renderer.create(<BrowserRouter><CreateView /></BrowserRouter>).toJSON()).toMatchSnapshot();
  });

});
