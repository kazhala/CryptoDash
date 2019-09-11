import React, { useContext } from 'react';
import HighChartsConfig from './HighChartsConfig';
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import ReactHighCharts from 'react-highcharts';
import HighChartsTheme from './HighChartsTheme';
import Spinner from '../Shared/Spinner/Spinner';

ReactHighCharts.Highcharts.setOptions(HighChartsTheme);

const PriceChart = props => {
    const priceContext = useContext(AppContext);

    return (
        <Tile>
            {priceContext.historicalChartData ?
                <ReactHighCharts config={HighChartsConfig(priceContext.historicalChartData)} /> :
                <Spinner />
            }

        </Tile>
    );
}

export default PriceChart;