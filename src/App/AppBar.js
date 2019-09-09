import React from 'react';
import styled, { css } from 'styled-components';

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
`;

export const ControlButton = props => {
    return (
        <ControlButtonEle active={props.active}>
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
            <Logo>CrytoDash</Logo>
            <div />
            <ControlButton active name={"dashboard"} />
            <ControlButton name={"settings"} />
        </Bar>
    );
}

export default AppBar;