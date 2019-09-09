import React from 'react';
import styled from 'styled-components';

import './App.css';
import AppLayout from './AppLayout';

const MyButton = styled.div`
  color: green;
`

function App() {
  return (
    <AppLayout>
      <MyButton>
        hello
      </MyButton>
      hello world
    </AppLayout>
  );
}

export default App;
