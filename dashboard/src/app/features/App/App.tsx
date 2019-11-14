import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from 'antd';

import './App.css';
import { Routes } from '../../Routes';
import Navigation from '../Navigation/Navigation';

const { Header, Content, Footer } = Layout;
const Placeholder = () => <div>Nothing</div>;

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Header>
          <Navigation />
        </Header>
        <Content className="app-content">
          <div className="app-content-inner">
            <Route exact path={Routes.SCAN_RESULT_LIST} component={Placeholder} />
            <Route path={Routes.SCAN_RESULT_CREATE} component={Placeholder} />
            <Route path={Routes.SCAN_RESULT_DETAILS} component={Placeholder} />
          </div>
        </Content>
        <Footer className="app-footer">App Created by Stefan Knoch</Footer>
      </Layout>
    </Router>
  );
}

export default App;
