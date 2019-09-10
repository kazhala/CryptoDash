import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import ConfirmButton from './ConfirmButton';
import CoinGrid from './CoinGrid';
import Search from './Search';

const Settings = props => {
    return (
        <div>
            <WelcomeMessage />
            <CoinGrid topSection />
            <ConfirmButton />
            <Search />
            <CoinGrid />
        </div>
    );
}

export default Settings;