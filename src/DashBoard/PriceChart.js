import React, { useContext } from 'react';
import HighChartsConfig from './HighChartsConfig';
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import ReactHighCharts from 'react-highcharts';
import HighChartsTheme from './HighChartsTheme';
import Spinner from '../Shared/Spinner/Spinner';
import ChartSelect from './ChartSelect';

ReactHighCharts.Highcharts.setOptions(HighChartsTheme);

const PriceChart = props => {
    const priceContext = useContext(AppContext);


    return (
        <Tile>
            <ChartSelect
                defaultValue={'months'}
                onChange={e => priceContext.changeChartSelect(e.target.value)}
            >
                <option value="days">Days</option>
                <option value='weeks'>Weeks</option>
                <option value='months'>Months</option>
            </ChartSelect>
            {priceContext.historicalChartData ?
                <ReactHighCharts config={HighChartsConfig(priceContext.historicalChartData)} /> :
                <Spinner chart />
            }

        </Tile>
    );
}

export default PriceChart;