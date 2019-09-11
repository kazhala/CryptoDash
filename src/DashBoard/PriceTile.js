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

const ChangePCT = styled.div`
    color: green;
    ${props => props.red && css`
        color: red;
    `}
`

const TickerPrice = styled.div`
    ${fontSizeBig}
`

const numberFormat = number => {
    return +(number + '').slice(0, 7);
}

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

const ChangePercent = props => {
    return (
        <JustifyRight >
            <ChangePCT red={props.data.CHANGEPCT24HOUR < 0}>
                {numberFormat(props.data.CHANGEPCT24HOUR)}%
            </ChangePCT>
        </JustifyRight>

    );
}

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

const PriceTile = props => {
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