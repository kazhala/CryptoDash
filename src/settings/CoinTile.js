import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';
import { SelectableTile, DeletableTile, DisabledTile } from '../shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../shared/CoinImage';

const CoinTile = props => {
    const coinContext = useContext(AppContext);
    let coin = coinContext.coinList[props.coinKey];
    let CoinTileDisplay = SelectableTile;
    if (props.topSection) {
        CoinTileDisplay = DeletableTile;
    }
    return (
        <CoinTileDisplay>
            <CoinHeaderGrid topSection={props.topSection} name={coin.CoinName} symbol={coin.Symbol} />
            <CoinImage coin={coin} />
        </CoinTileDisplay>
    );
}

export default CoinTile;