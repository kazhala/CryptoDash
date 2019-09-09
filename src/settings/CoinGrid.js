import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { SelectableTile } from './Tile';

export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
`

const CoinGrid = props => {
    const coinContext = useContext(AppContext);
    return (
        <CoinGridStyled>
            {Object.keys(coinContext.coinList).map(coinKey => {
                return <SelectableTile>{coinKey}</SelectableTile>
            })}
        </CoinGridStyled>
    );
}

export default CoinGrid;