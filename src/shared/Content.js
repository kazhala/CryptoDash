import React, { useContext } from 'react';
import { AppContext } from '../App/AppProvider';

const Content = props => {
    const appContext = useContext(AppContext);
    let content = <div>Loading Coins</div>;
    if (appContext.coinList) {
        content = <div>{props.children}</div>;
    }
    return (
        <div>
            {content}
        </div>
    );
}

export default Content;