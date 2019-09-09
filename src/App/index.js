import React from 'react';

import './App.css';
import AppLayout from './AppLayout';
import Settings from '../settings/index';
import AppBar from './AppBar';
import AppProvider from './AppProvider';

function App() {
  return (
    <AppProvider>
      <AppLayout>
        <AppBar />
        <Settings />
      </AppLayout>
    </AppProvider>
  );
}

export default App;
