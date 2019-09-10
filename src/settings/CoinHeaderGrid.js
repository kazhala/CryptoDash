import React from 'react';
import styled from 'styled-components';
import { DeletableTile } from '../Shared/Tile';


export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

`

export const CoinSymbol = styled.div`
    justify-self: right;
`

export const DeleteIcon = styled.div`
    justify-self: right;
    display: none;
    ${DeletableTile}:hover &{
        display: block;
        color: red;
    }
`

const CoinHeaderGrid = props => {
    return (
        <CoinGridStyled>
            <div>{props.name}</div>
            {props.topSection ? (<DeleteIcon>X</DeleteIcon>) :
                (<CoinSymbol>{props.symbol}</CoinSymbol>)
            }
        </CoinGridStyled>
    );
}

export default CoinHeaderGrid;