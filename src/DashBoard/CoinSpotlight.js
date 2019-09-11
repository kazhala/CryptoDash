import React, { useContext } from 'react';
import styled from 'styled-components';

import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import CoinImage from '../Shared/CoinImage';

const SpotlightName = styled.h2`
    text-align: center;
`

const CoinSpotlight = props => {
    const coinContext = useContext(AppContext);

    return (
        <Tile>
            <SpotlightName>{coinContext.coinList[coinContext.currentFavorite].CoinName}</SpotlightName>
            <CoinImage coin={coinContext.coinList[coinContext.currentFavorite]} spotlight />
        </Tile>
    );
}

export default CoinSpotlight;