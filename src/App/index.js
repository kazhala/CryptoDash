import React from 'react';

import './App.css';
import AppLayout from './AppLayout';
import Settings from '../Settings/index';
import AppBar from './AppBar';
import AppProvider from './AppProvider';
import Page from '../Shared/Page';
import Content from '../Shared/Content';
import DashBoard from '../DashBoard/index';

function App() {
  return (
    <AppProvider>
      <AppLayout>
        <AppBar />
        <Content>
          <Page name={'settings'}><Settings /></Page>
          <Page name={'dashboard'}><DashBoard /></Page>
        </Content>
      </AppLayout>
    </AppProvider>
  );
}

export default App;
