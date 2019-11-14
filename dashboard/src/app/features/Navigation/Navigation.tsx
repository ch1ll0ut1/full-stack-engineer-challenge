import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import { Routes } from '../../Routes';

const Navigation: React.FC = () => {
  return (
    <Menu mode="horizontal" theme="dark" style={{ lineHeight: '64px' }}>
      <Menu.Item key="list">
        <Icon type="unordered-list" />
        List
        <Link to={Routes.SCAN_RESULT_LIST} />
      </Menu.Item>
      <Menu.Item key="create">
        <Icon type="plus-circle" />
        Create
        <Link to={Routes.SCAN_RESULT_CREATE} />
      </Menu.Item>
    </Menu>
  );
}

export default Navigation;
