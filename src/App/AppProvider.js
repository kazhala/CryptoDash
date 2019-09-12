import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';

const cc = require('cryptocompare');
//cc.setApiKey('e12b0c000029b3ed3ce08e55da9887084952104107a4f79d242aca578346f5e2');
//commented out apikey because I don't want unnecessary calls to server during development
//If you cloned this, uncomment the apiKey

//Set predefined numbers, easier to change if later want to modify
const MAX_FAVORITES = 10;
//Determines how many data it should get, e.g. 10 means get latest 10 months/weeks/days data
const TIME_UNITS = 10;

//predefine the available value in the context
//It would be overwritten in the app provider, 
//however, it provides you some code snippets when calling the context
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
    //determines which page to display
    const [pageState, setPageState] = useState('dashboard');
    //fist time vist state 
    const [visitState, setVisitState] = useState(false);
    //stores the coinlist and used to check if fetchprice() should execute
    const [coinList, setCoinList] = useState(null);
    //default 4 favorite coins for new users (they are pretty popular coins)
    const [favList, setFavList] = useState(['BTC', 'ETC', 'XMR', 'DOGE']);
    //Used to configure fuzzy search
    const [filteredCoins, setFilteredCoins] = useState(null);
    //stores the fetched price
    const [pricesState, setPrices] = useState(null);
    //stores the current displaying coin
    const [currentFavorite, setCurrentFavorite] = useState(null);
    //stores the chart data used for dislaying chart
    const [historicalChartData, setHistoricalChartData] = useState(null);
    //stores the time interval to display chart, months/weeks/days
    const [timeInterval, setTimeInterval] = useState('months');

    //acts as componentdidmount, no dependency, so only execute once when mounted
    useEffect(() => {
        //check if local storage containes cookies
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        //if no data in local storage, set user as first time user and display welcome message
        if (!cryptoDashData) {
            setPageState('settings');
            setVisitState(true);
            //if data in local storage, read and set the data
        } else if (cryptoDashData) {
            setFavList(cryptoDashData.favorites);
            setCurrentFavorite(cryptoDashData.currFav);
            //setTimeInterval('months');
        }
        fetchCoins();
    }, []);

    //fetchPrice would fetch prices for the coins in the favorite list
    //but favorte list have not been updated yet when component mounted
    //if called in the previous useEffect, it would only render predefined 4 favorite list
    //TLDR: below useEffect would be executed when previouse useEffect is finished executing
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

    //Same as the above useEffect, fetchHistorical() needs currentFavorite to be set
    //When mounted, currentFavorite has not been set yet
    //This would be executed when currentFavortie is being set or when user change the timeInterval
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

    //Asynconously fetch the historical data and then stores the data for chart
    const fetchHistorical = async () => {
        if (visitState) return;
        let results = await historicalData();
        //console.log(results);
        let historical = [
            {
                //the line name in the graph
                name: currentFavorite,
                //the x and y axis on the graph
                data: results.map((ticker, index) => [
                    moment().subtract({ [timeInterval]: TIME_UNITS - index }).valueOf(),
                    ticker.USD
                ])
            }
        ];
        //console.log(historical);
        setHistoricalChartData(historical);
    }

    //Loop through the time interval and call the api
    //e.g. 10 months data, 9 months data, 8 months data.....
    const historicalData = () => {
        let promises = [];
        for (let units = TIME_UNITS; units > 0; units--) {
            promises.push(
                cc.priceHistorical(currentFavorite, ['USD'], moment().subtract({ [timeInterval]: units }).toDate())
            )
        }
        return Promise.all(promises);
    }

    //fetch all coins and store in the state
    const fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        //console.log(coinList);
        setCoinList(coinList);
    }

    //fetch the price, check if price data is available, store in the state
    const fetchPrices = async () => {
        if (visitState) return;
        let prices = await pricesData();
        prices = prices.filter(price => Object.keys(price).length);
        //console.log(prices);
        setPrices(prices);
    }

    //click handler when user clicks "confirm favorites"
    //set clear historical data to display spinner
    //store the data in local storage immutably
    const setFavorite = sym => {
        setCurrentFavorite(sym);
        setHistoricalChartData(null);
        localStorage.setItem('cryptoDash', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currFav: sym,
        }));
    }

    //for each coins in the favorite list, fetch their price data
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

    //click handler when user clicks app bar
    const setPage = page => {
        setPageState(page);
    }

    //click handler when user selects a key to add in to the favorite list
    const addCoin = key => {
        let newList = [...favList];
        if (newList.length < MAX_FAVORITES) {
            newList.push(key);
            setFavList(newList);
        }
    }

    //click handler when user removes a coin from favorite list
    //used lodash library to handle deletion
    const removeCoin = key => {
        let newList = [...favList];
        _.pull(newList, key);
        setFavList(newList);
    }

    //when user selets a different time interval to display
    const changeChartSelect = value => {
        //console.log(value);
        setTimeInterval(value);
        setHistoricalChartData(null);
    }

    //Handles user click confirm favorites
    //if no favlist, return, otherwise would cause error when reading empty array
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

    //used lodash library to check if it contains
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