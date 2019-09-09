import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
    display: grid;
    grid-template-columns: 180px auto 100px 100px
`

const AppBar = props => {

    return (
        <Bar>
            <div>CrytoDash</div>
            <div />
            <div>DashBoard</div>
            <div>Settings</div>
        </Bar>
    );
}

export default AppBar;