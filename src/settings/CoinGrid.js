import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../App/AppProvider';

export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`

const CoinGrid = props => {
    const coinContext = useContext(AppContext);
    return (
        <CoinGridStyled>
            {Object.keys(coinContext.coinList).map(coinKey => {
                return <div>{coinKey}</div>
            })}
        </CoinGridStyled>
    );
}

export default CoinGrid;