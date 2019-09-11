import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { AppContext } from './AppProvider';

const Bar = styled.div`
    display: grid;
    grid-template-columns: 180px auto 100px 100px;
    margin-bottom: 40px;
`

const Logo = styled.div`
    font-size: 1.5em;
`;

const ControlButtonEle = styled.div`
    cursor: pointer;
    ${ props => props.active && css`
        text-shadow: 0px 0px 60px #03ff03
    `}
    ${props => props.hidden && css`
        display: none;
    `}
`;

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

const toProperCase = lower => {
    return lower.charAt(0).toUpperCase() + lower.substr(1);
}

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