import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';
import Spinner from './Spinner/Spinner';

const Content = props => {
    const appContext = useContext(AppContext);
    let content = <div><Spinner /></div>;
    if (!appContext.firstVisit && !appContext.pricesState) {
        content = <div><Spinner /></div>
    }
    if (appContext.coinList && (appContext.firstVisit || appContext.pricesState)) {
        content = <div>{props.children}</div>;
    }
    return (
        <div>
            {content}
        </div>
    );
}

export default Content;