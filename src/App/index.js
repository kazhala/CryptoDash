import React from 'react';

import './App.css';
import AppLayout from './AppLayout';
import Settings from '../settings/index';
import AppBar from './AppBar';
import AppProvider from './AppProvider';
import Page from '../shared/Page';
import Content from '../shared/Content';

function App() {
  return (
    <AppProvider>
      <AppLayout>
        <AppBar />
        <Content>
          <Page name={'settings'}><Settings /></Page>

        </Content>
      </AppLayout>
    </AppProvider>
  );
}

export default App;
