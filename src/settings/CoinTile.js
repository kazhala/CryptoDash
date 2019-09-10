import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';
import { SelectableTile } from './Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../shared/CoinImage';

const CoinTile = props => {
    const coinContext = useContext(AppContext);
    let coin = coinContext.coinList[props.coinKey];
    return (
        <SelectableTile>
            <CoinHeaderGrid name={coin.CoinName} symbol={coin.Symbol} />
            <CoinImage coin={coin} />
        </SelectableTile>
    );
}

export default CoinTile;