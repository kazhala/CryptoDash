import React, { useState } from 'react';

export const AppContext = React.createContext({
    page: null,
    setPage: () => { }
});

const AppProvider = props => {
    const [pageState, setPageState] = useState('dashboard');

    const setPage = page => {
        setPageState(page);
    }

    return (
        <AppContext.Provider value={{ page: pageState, setPage: setPage }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default AppProvider;