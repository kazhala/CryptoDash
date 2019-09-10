import React from 'react';
import styled from 'styled-components';


export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

`

export const CoinSymbol = styled.div`
    justify-self: right;
`

const CoinHeaderGrid = props => {
    return (
        <CoinGridStyled>
            <div>{props.name}</div>
            <CoinSymbol>{props.symbol}</CoinSymbol>
        </CoinGridStyled>
    );
}

export default CoinHeaderGrid;