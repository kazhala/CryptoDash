import React, { useState, useEffect } from 'react';

const cc = require('cryptocompare');


export const AppContext = React.createContext({
    page: null,
    setPage: () => { },
    confirmFavorites: () => { },
    firstVisit: false
});

const AppProvider = props => {
    const [pageState, setPageState] = useState('dashboard');
    //fist time vist state 
    const [visitState, setVisitState] = useState(false);
    const [coinList, setCoinList] = useState(null);

    useEffect(() => {
        console.log('effected');
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) {
            setPageState('settings');
            setVisitState(true);
        };
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

    const confirmFavorites = () => {
        console.log('hello');
        setVisitState(false);
        setPageState('dashboard');
        localStorage.setItem('cryptoDash', JSON.stringify({
            test: 'hello'
        }));
    }

    return (
        <AppContext.Provider value={{
            page: pageState,
            setPage: setPage,
            firstVisit: visitState,
            confirmFavorites: confirmFavorites
        }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppProvider;