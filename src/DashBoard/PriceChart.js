import React, { useContext } from 'react';
import HighChartsConfig from './HighChartsConfig';
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import ReactHighCharts from 'react-highcharts';

const PriceChart = props => {
    const priceContext = useContext(AppContext);

    return (
        <Tile>
            <ReactHighCharts config={HighChartsConfig()} />
        </Tile>
    );
}

export default PriceChart;