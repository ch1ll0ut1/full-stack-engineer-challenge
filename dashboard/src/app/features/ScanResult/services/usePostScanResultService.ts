import { useEffect, useState } from 'react';

import { ScanResult } from '../models/ScanResult';
import { Service } from '../../Service';
import { normalizeResult } from './normalizeResult';
import { config } from '../../../config';
import { ScanResultFormData } from '../models/ScanResultFormData';

const usePostScanResultService = (data?: ScanResultFormData) => {
  const [result, setResult] = useState<Service<ScanResult>>({
    status: 'loading'
  });

  useEffect(() => {
    if (!data) {
      setResult({ status: 'error', error: new Error('waiting for form submit') })
      return;
    }

    const body = JSON.stringify({
      ...data,
      findings: JSON.parse(data.findings),
    });

    fetch(`${config.apiUrl}/api/v1/results`, {
      body,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(normalizeResult)
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, [data]);

  return result;
};

export default usePostScanResultService;