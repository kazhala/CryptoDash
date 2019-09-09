import React from 'react';

import './App.css';
import AppLayout from './AppLayout';
import Settings from '../settings/index';
import AppBar from './AppBar';
import AppProvider from './AppProvider';
import Page from '../shared/Page';
function App() {
  return (
    <AppProvider>
      <AppLayout>
        <AppBar />
        <Page name={'settings'}><Settings /></Page>
      </AppLayout>
    </AppProvider>
  );
}

export default App;
