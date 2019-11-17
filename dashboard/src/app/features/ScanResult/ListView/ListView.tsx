import React from 'react';

import useScanResultsService from '../services/useScanResultsService';
import { ScanResult } from '../models/ScanResult';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'react-router-dom';
import { Routes } from '../../../Routes';

const renderTable = (data: ScanResult[]) => {

  const columns: ColumnProps<ScanResult>[] = [
    {
      title: 'Repository',
      dataIndex: 'repositoryName',
      key: 'repositoryName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Last Change',
      dataIndex: 'updatedAt',
      key: 'updatedAt ',
      render: (date: Date) => date.toLocaleString(),
    },
    {
      title: 'View Findings',
      dataIndex: 'id',
      key: 'id ',
      render: (id: string) => <Link to={Routes.SCAN_RESULT_DETAILS.replace(':id', id)}>Findings</Link>,
    },
  ];

  return (
    <Table columns={columns} dataSource={data} rowKey="id" />
  );
}

const ListView: React.FC = () => {
  const service = useScanResultsService();

  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && renderTable(service.payload)}
      {service.status === 'error' && (
        <div>Error, there was an network problem. Please try again later.</div>
      )}
    </div>
  )
};

export default ListView;
