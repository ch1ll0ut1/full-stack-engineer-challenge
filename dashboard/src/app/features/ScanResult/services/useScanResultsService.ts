import { useEffect, useState } from 'react';

import { ScanResult } from '../models/ScanResult';
import { Service } from '../../Service';
import { normalizeResult } from './normalizeResult';
import { config } from '../../../config';

const useScanResultsService = () => {
  const [result, setResult] = useState<Service<ScanResult[]>>({
    status: 'loading'
  });

  useEffect(() => {
    fetch(`${config.apiUrl}/api/v1/results`)
      .then(response => response.json())
      .then(response => response.map(normalizeResult))
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default useScanResultsService;