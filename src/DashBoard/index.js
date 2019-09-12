import React from 'react';
import styled from 'styled-components';

import PriceGrid from './PriceGrid';
import CoinSpotlight from './CoinSpotlight';
import PriceChart from './PriceChart';

const ChartGrid = styled.div`
    display: grid;
    margin-top: 20px;
    grid-gap: 15px;
    grid-template-columns: 1fr 3fr;
`

//container for dash board
//Coins to be selected on top
//grpah below
const DashBoard = props => {
    return (
        <div>
            <PriceGrid />
            <ChartGrid>
                <CoinSpotlight />
                <PriceChart />

            </ChartGrid>

        </div>
    );
}

export default DashBoard;