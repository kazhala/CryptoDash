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

    if (coinContext.isInFavorites(props.coinKey) && !props.topSection) {
        CoinTileDisplay = DisabledTile;
    }
    const clickCoinHandler = (topSection, coinKey, addCoin, removeCoin) => {
        return topSection ? () => {
            removeCoin(coinKey)
        } : () => {
            addCoin(coinKey)
        }
    }
    return (
        <CoinTileDisplay onClick={clickCoinHandler(props.topSection, props.coinKey, coinContext.addCoin, coinContext.removeCoin)}>
            <CoinHeaderGrid topSection={props.topSection} name={coin.CoinName} symbol={coin.Symbol} />
            <CoinImage coin={coin} />
        </CoinTileDisplay>
    );
}

export default CoinTile;