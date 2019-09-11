import React from 'react';
import styled, { css } from 'styled-components';

const StyledCoinImage = styled.img`
    height: 50px;
    ${props => props.spotlight && css`
        height: 200px;
        margin: auto;
        display: block;
    `}
`

const CoinImage = props => {
    return (
        <StyledCoinImage
            spotlight={props.spotlight}
            alt={props.coin.Symbol}
            src={`http://cryptocompare.com/${props.coin.ImageUrl}`}
        />
    );
}

export default CoinImage;