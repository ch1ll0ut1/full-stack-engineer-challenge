import React from 'react';

import useScanResultsService from '../services/useScanResultsService';
import { ScanResult } from '../models/ScanResult';

const renderResult: React.FC<ScanResult> = (result) => {
  const { repositoryName, status, updatedAt } = result;

  return (
    <>
      <div key={repositoryName}>{repositoryName}</div>
      <div key={status}>{status}</div>
      <div key={updatedAt.getTime()}>{updatedAt.toLocaleString()}</div>
    </>
  )
}

const ListView: React.FC = () => {
  const service = useScanResultsService();

  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && service.payload.map(renderResult)}
      {service.status === 'error' && (
        <div>Error, there was an network problem. Please try again later.</div>
      )}
    </div>
  )
};

export default ListView;
