import React from 'react';

import './App.css';
import AppLayout from './AppLayout';
import Settings from '../Settings/index';
import AppBar from './AppBar';
import AppProvider from './AppProvider';
import Page from '../Shared/Page';
import Content from '../Shared/Content';
import DashBoard from '../DashBoard/index';

//The app container, which displays everything to index.html
//App provider is the context provider which provides global state
//App layout defines the global margin to surrounding
//Content checks the state and decides to display spinner
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
