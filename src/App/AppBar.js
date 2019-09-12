import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { AppContext } from './AppProvider';

//using styled-component to style the app bar
const Bar = styled.div`
    display: grid;
    grid-template-columns: 180px auto 100px 100px;
    margin-bottom: 40px;
`

//set logo fontsize
const Logo = styled.div`
    font-size: 1.5em;
`;

//check active props or hidden props and display accordingly
const ControlButtonEle = styled.div`
    cursor: pointer;
    ${ props => props.active && css`
        text-shadow: 0px 0px 60px #03ff03
    `}
    ${props => props.hidden && css`
        display: none;
    `}
`;

//get the value from context provider, and pass the value to the controlbutton styled to display
export const ControlButton = props => {
    const pageContext = useContext(AppContext);
    return (
        <ControlButtonEle
            active={props.name === pageContext.page}
            onClick={() => pageContext.setPage(props.name)}
            hidden={pageContext.firstVisit && props.name === 'dashboard'}
        >
            {toProperCase(props.name)}
        </ControlButtonEle>
    )
}

//change lower case to uppercase first letter, because I used lower case to check page display
//but want to display as uppercase
const toProperCase = lower => {
    return lower.charAt(0).toUpperCase() + lower.substr(1);
}

//Appbar layout
const AppBar = props => {

    return (
        <Bar>
            <Logo>CryptoKAZ</Logo>
            <div />
            <ControlButton name={"dashboard"} />
            <ControlButton name={"settings"} />
        </Bar>
    );
}

export default AppBar;