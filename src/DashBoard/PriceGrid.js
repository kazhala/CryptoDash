import React, { useContext } from 'react';
import styled from 'styled-components';

import { AppContext } from '../App/AppProvider';
import PriceTile from './PriceTile';

const GridPrice = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    margin-top: 40px;
`

//get the price array from context and map it out to display each Tile
const PriceGrid = props => {
    const priceContext = useContext(AppContext);
    return (
        <GridPrice>
            {priceContext.pricesState.map((price, index) => {
                return <PriceTile key={index} price={price} index={index} />
            })}
        </GridPrice>
    );
}

export default PriceGrid;