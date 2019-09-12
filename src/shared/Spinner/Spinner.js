import React from 'react';
import classes from './Spinner.module.css';
import chart from './ChartSpinner.module.css';

//spinner for the application
//based on section display different background color
const spinner = props => {
    return (
        <div className={props.chart ? chart.loader : classes.loader}>Loading...</div>
    );
}

export default spinner;