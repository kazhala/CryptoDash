import React from 'react';

const CoinImage = props => {
    return (
        <img
            alt={props.coin.Symbol}
            style={props.style || { height: '50px' }}
            src={`http://cryptocompare.com/${props.coin.ImageUrl}`}
        />
    );
}

export default CoinImage;