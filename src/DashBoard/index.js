import React from 'react';
import styled from 'styled-components';

import PriceGrid from './PriceGrid';
import CoinSpotlight from './CoinSpotlight';


const ChartGrid = styled.div`
    display: grid;
    margin-top: 20px;
    grid-gap: 15px;
    grid-template-columns: 1fr 3fr;
`

const DashBoard = props => {
    return (
        <div>
            <PriceGrid />
            <ChartGrid>
                <CoinSpotlight />
                <div>Chart goes here</div>

            </ChartGrid>

        </div>
    );
}

export default DashBoard;