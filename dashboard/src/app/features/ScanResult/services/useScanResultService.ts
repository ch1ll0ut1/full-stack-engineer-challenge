import { useEffect, useState } from 'react';

import { ScanResult } from '../models/ScanResult';
import { Service } from '../../Service';
import { normalizeResult } from './normalizeResult';
import { config } from '../../../config';

const useScanResultService = (id: string | number | undefined) => {
  const [result, setResult] = useState<Service<ScanResult>>({
    status: 'loading'
  });

  useEffect(() => {
    if (!id) {
      setResult({ status: 'error', error: new Error('not found') });
      return;
    }

    fetch(`${config.apiUrl}/api/v1/results/${id}`)
      .then(response => response.json())
      .then(normalizeResult)
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, [id]);

  return result;
};

export default useScanResultService;