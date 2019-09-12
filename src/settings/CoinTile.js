import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';
import { SelectableTile, DeletableTile, DisabledTile } from '../Shared/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from '../Shared/CoinImage';

const CoinTile = props => {
    //read data from context
    const coinContext = useContext(AppContext);
    let coin = coinContext.coinList[props.coinKey];
    let CoinTileDisplay = SelectableTile;

    //if topsection, display red boarder
    if (props.topSection) {
        CoinTileDisplay = DeletableTile;
    }

    //if already in favorites, disable the tile
    if (coinContext.isInFavorites(props.coinKey) && !props.topSection) {
        CoinTileDisplay = DisabledTile;
    }

    //handles when user clicks either from top or bottom
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