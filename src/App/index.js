import React from 'react';
import styled from 'styled-components';

import './App.css';

const MyButton = styled.div`
  color: green;
`

function App() {
  return (
    <div>
      <MyButton>
        hello
      </MyButton>
      hello world
    </div>
  );
}

export default App;
