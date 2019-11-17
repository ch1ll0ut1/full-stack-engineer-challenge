import React from 'react';
import { useParams } from 'react-router-dom';
import { Tree, Icon } from 'antd';

import { ScanResult } from '../models/ScanResult';
import useScanResultService from '../services/useScanResultService';
import Title from 'antd/lib/typography/Title';

const { TreeNode } = Tree;

const renderNode = (data: object, depth = '0') => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  return values.map((value, i) => {
    const currentDepth = `${depth}-${i}`;

    if (value instanceof Date) {
      return <TreeNode icon={<Icon type="calendar" />} title={value.toLocaleString()} key={currentDepth} />;
    } else if (typeof value === 'number') {
      return <TreeNode icon={<Icon type="number" />} title={value} key={currentDepth} />;
    } else if (typeof value === 'object') {
      const title = depth === '0' ? `Finding #${keys[i]}` : keys[i];

      return (
        <TreeNode icon={<Icon type="smile-o" />} title={title} key={currentDepth}>
          {renderNode(value, currentDepth)}
        </TreeNode>
      );
    } else {
      return <TreeNode icon={<Icon type="barcode" />} title={value} key={currentDepth} />;
    }
  });
}

const renderDataView = (data: ScanResult) => {
  return (
    <>
      <Title>Findings of {data.repositoryName} ({data.status})</Title>
      <Tree
        showIcon={true}
        defaultExpandAll={true}
        switcherIcon={<Icon type="down" />}
      >
        {renderNode(data.findings)}
      </Tree>
    </>
  );
}

const DetailView: React.FC = () => {
  const { id } = useParams();
  const service = useScanResultService(id);

  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' && renderDataView(service.payload)}
      {service.status === 'error' && (
        <div>Error, there was an network problem. Please try again later.</div>
      )}
    </div>
  )
};

export default DetailView;
