import React, { useContext } from 'react';
import styled, { css } from 'styled-components';

import { SelectableTile } from '../Shared/Tile';
import { fontSize3, fontSizeBig, greenBoxShadow } from '../Shared/Styles';
import { CoinGridStyled } from '../Settings/CoinHeaderGrid';
import { AppContext } from '../App/AppProvider';

const JustifyRight = styled.div`
    justify-self: right;
`
const JustifyLeft = styled.div`
    justify-self: left;
`

//determines when the changed percent should green or red
const ChangePCT = styled.div`
    color: green;
    ${props => props.red && css`
        color: red;
    `}
`

const TickerPrice = styled.div`
    ${fontSizeBig}
`

//controls the number to be 7 digit
const numberFormat = number => {
    return +(number + '').slice(0, 7);
}

//if the index of tile is higher than 5, make their tile and font smaller
//Bigger top row, smaller second row
//Display indicator for current selected tile
const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css`
        display: grid;
        ${fontSize3}
        grid-gap: 5px;
        grid-template-columns: repeat(3, 1fr);
        justify-items: right;
    `}

    ${props => props.currentFavorite && css`
        ${greenBoxShadow}
        pointer-events: none;
    `}
`

//top right of the tile to display percentage changed
const ChangePercent = props => {
    return (
        <JustifyRight >
            <ChangePCT red={props.data.CHANGEPCT24HOUR < 0}>
                {numberFormat(props.data.CHANGEPCT24HOUR)}%
            </ChangePCT>
        </JustifyRight>

    );
}

//if second row, display tile as smaller(compacted)
const TilePriceCompact = props => {
    return (
        <PriceTileStyled compact currentFavorite={props.currentFavorite} onClick={props.setCurrentFavorite}>
            <JustifyLeft> {props.syms} </JustifyLeft>
            <ChangePercent data={props.data} />
            <div>
                ${numberFormat(props.data.PRICE)}
            </div>
        </PriceTileStyled>
    );
}

//display the tile with top (coin name, percentage changed), bottom (price)
const TilePrice = props => {
    return (
        <PriceTileStyled currentFavorite={props.currentFavorite} onClick={props.setCurrentFavorite}>
            <CoinGridStyled>
                <div> {props.syms} </div>
                <ChangePercent data={props.data} />
            </CoinGridStyled>
            <TickerPrice>
                ${numberFormat(props.data.PRICE)}
            </TickerPrice>
        </PriceTileStyled>
    );
}

//Handles the logic
const PriceTile = props => {
    //read data from context
    const favContext = useContext(AppContext);
    const symbol = Object.keys(props.price)[0];
    const data = props.price[symbol]['USD'];
    const TileClass = props.index < 5 ? TilePrice : TilePriceCompact;
    return (
        <TileClass
            syms={symbol}
            data={data}
            currentFavorite={favContext.currentFavorite === symbol}
            setCurrentFavorite={() => favContext.setFavorite(symbol)}
        />
    );
}

export default PriceTile;