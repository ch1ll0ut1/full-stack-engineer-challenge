import React, { useState } from 'react';

import CreateScanResultForm from '../CreateScanResultForm/CreateScanResultForm';
import { ScanResultFormData } from '../models/ScanResultFormData';
import usePostScanResultService from '../services/usePostScanResultService';
import { Redirect } from 'react-router';
import { Routes } from '../../../Routes';

const CreateView: React.FC = () => {
  const [formData, setFormData] = useState<ScanResultFormData | undefined>();
  const service = usePostScanResultService(formData);

  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && <Redirect to={Routes.SCAN_RESULT_DETAILS.replace(':id', service.payload.id.toString())} />}
      {service.status === 'error' && (
        <CreateScanResultForm onSubmit={setFormData} />
      )}
    </div>
  )
};

export default CreateView;
