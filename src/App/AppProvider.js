import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const cc = require('cryptocompare');

const MAX_FAVORITES = 10;

export const AppContext = React.createContext({
    page: null,
    setPage: () => { },
    confirmFavorites: () => { },
    firstVisit: false,
    coinList: null,
    favoriteCoinList: ['BTC', 'ETC', 'XMR', 'DOGE'],
    addCoin: () => { },
    removeCoin: () => { },
    isInFavorites: () => { },
    filteredCoins: null,
    searchCoins: () => { }
});

const AppProvider = props => {
    const [pageState, setPageState] = useState('dashboard');
    //fist time vist state 
    const [visitState, setVisitState] = useState(false);
    const [coinList, setCoinList] = useState(null);
    const [favList, setFavList] = useState(['BTC', 'ETC', 'XMR', 'DOGE']);
    const [filteredCoins, setFilteredCoins] = useState(null);

    useEffect(() => {
        console.log('effected');
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) {
            setPageState('settings');
            setVisitState(true);
        } else if (cryptoDashData) {
            setFavList(cryptoDashData.favorites);
        }
        fetchCoins();
    }, []);

    const fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        console.log(coinList);
        setCoinList(coinList);
    }

    const setPage = page => {
        setPageState(page);
    }

    const addCoin = key => {
        let newList = [...favList];
        if (newList.length < MAX_FAVORITES) {
            newList.push(key);
            setFavList(newList);
        }
    }

    const removeCoin = key => {
        let newList = [...favList];
        _.pull(newList, key);
        setFavList(newList);
    }

    const confirmFavorites = () => {
        console.log('hello');
        setVisitState(false);
        setPageState('dashboard');
        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: favList
        }));
    }

    const isInFavorites = key => {
        return _.includes(favList, key);
    }

    const searchCoins = filteredCoins => {
        setFilteredCoins(filteredCoins);
    }

    return (
        <AppContext.Provider value={{
            page: pageState,
            setPage: setPage,
            firstVisit: visitState,
            confirmFavorites: confirmFavorites,
            coinList: coinList,
            favoriteCoinList: favList,
            addCoin: addCoin,
            removeCoin: removeCoin,
            isInFavorites: isInFavorites,
            filteredCoins: filteredCoins,
            searchCoins: searchCoins,
        }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppProvider;