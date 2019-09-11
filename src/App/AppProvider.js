import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';

const cc = require('cryptocompare');
cc.setApiKey('e12b0c000029b3ed3ce08e55da9887084952104107a4f79d242aca578346f5e2');

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

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
    searchCoins: () => { },
    pricesState: null,
    currentFavorite: null,
    setFavorite: () => { },
    historicalChartData: null,
    changeChartSelect: () => { }
});

const AppProvider = props => {
    const [pageState, setPageState] = useState('dashboard');
    //fist time vist state 
    const [visitState, setVisitState] = useState(false);
    const [coinList, setCoinList] = useState(null);
    const [favList, setFavList] = useState(['BTC', 'ETC', 'XMR', 'DOGE']);
    const [filteredCoins, setFilteredCoins] = useState(null);
    const [pricesState, setPrices] = useState(null);
    const [currentFavorite, setCurrentFavorite] = useState(null);
    const [historicalChartData, setHistoricalChartData] = useState(null);
    const [timeInterval, setTimeInterval] = useState('months');

    useEffect(() => {
        //console.log('effected');
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) {
            setPageState('settings');
            setVisitState(true);
        } else if (cryptoDashData) {
            setFavList(cryptoDashData.favorites);
            setCurrentFavorite(cryptoDashData.currFav);
            //setTimeInterval('months');
        }
        fetchCoins();
    }, []);

    useEffect(() => {
        if (coinList) {
            fetchPrices();
            //fetchHistorical();
        }
        // eslint-disable-next-line
    }, [coinList, visitState]);

    /*
    useEffect(() => {
        if (coinList) {
            fetchPrices();
        }
        // eslint-disable-next-line
    }, [visitState]);
    */

    useEffect(() => {
        if (currentFavorite) {
            fetchHistorical();
        }
        // eslint-disable-next-line 
    }, [currentFavorite, timeInterval])

    /*
    useEffect(() => {
        if (timeInterval) {
            fetchHistorical();
        }
        // eslint-disable-next-line  
    }, [timeInterval])
    */

    const fetchHistorical = async () => {
        if (visitState) return;
        let results = await historicalData();
        //console.log(results);
        let historical = [
            {
                name: currentFavorite,
                data: results.map((ticker, index) => [
                    moment().subtract({ [timeInterval]: TIME_UNITS - index }).valueOf(),
                    ticker.USD
                ])
            }
        ];
        //console.log(historical);
        setHistoricalChartData(historical);
    }

    const historicalData = () => {
        let promises = [];
        for (let units = TIME_UNITS; units > 0; units--) {
            promises.push(
                cc.priceHistorical(currentFavorite, ['USD'], moment().subtract({ [timeInterval]: units }).toDate())
            )
        }
        return Promise.all(promises);
    }

    const fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        //console.log(coinList);
        setCoinList(coinList);
    }

    const fetchPrices = async () => {
        if (visitState) return;
        let prices = await pricesData();
        prices = prices.filter(price => Object.keys(price).length);
        //console.log(prices);
        setPrices(prices);
    }

    const setFavorite = sym => {
        setCurrentFavorite(sym);
        setHistoricalChartData(null);
        localStorage.setItem('cryptoDash', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currFav: sym,
        }));
    }

    const pricesData = async () => {
        let returnData = [];
        for (let i = 0; i < favList.length; i++) {
            try {
                let priceData = await cc.priceFull(favList[i], 'USD');
                returnData.push(priceData);
            } catch (error) {
                console.warn('Fetch price error: ', error);
            }
        }
        return returnData;
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

    const changeChartSelect = value => {
        //console.log(value);
        setTimeInterval(value);
        setHistoricalChartData(null);
    }

    const confirmFavorites = () => {
        if (favList.length === 0) {
            return;
        }
        let currFav = favList[0];
        setCurrentFavorite(currFav);
        //console.log('hello');
        setVisitState(false);
        setPageState('dashboard');
        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: favList,
            currFav: currFav,
        }));
        setPrices(null);
        fetchPrices();
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
            pricesState: pricesState,
            currentFavorite: currentFavorite,
            setFavorite: setFavorite,
            historicalChartData: historicalChartData,
            changeChartSelect: changeChartSelect
        }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppProvider;