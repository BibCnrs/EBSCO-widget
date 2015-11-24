'use strict';

import React, { Component, PropTypes } from 'react';
import RcSlider from 'rc-slider';
import DatePicker from 'react-input-calendar';

export default class Limiters extends Component {
    render() {
        let { fromPublicationDate, toPublicationDate, onLimitPublicationDate } = this.props;
        const max = new Date().getFullYear() + 1;
        const pickerStyle = {display: 'inline-block'};
        return (
            <div className="publication-date-limiter">
                <div className="pickers">
                    <DatePicker
                        style={pickerStyle}
                        format="DD/MM/YYYY"
                        computableFormat="YYYY-MM-DD"
                        date={fromPublicationDate}
                        onChange={ (date) => onLimitPublicationDate(date, toPublicationDate)}
                    />
                    <label>Date de publication</label>
                    <DatePicker
                        style={pickerStyle}
                        format="DD/MM/YYYY"
                        computableFormat="YYYY-MM-DD"
                        date={toPublicationDate}
                        onChange={ (date) => onLimitPublicationDate(fromPublicationDate, date)}
                    />
                </div>
                <RcSlider
                    value={[parseInt(fromPublicationDate.substr(0, 4)), parseInt(toPublicationDate.substr(0, 4))]}
                    min={1000}
                    max={max}
                    step={1}
                    range={true}
                    onChange={ (values) => onLimitPublicationDate(`${values[0]}-12-31`, `${values[1]}-12-31`)}
                />
            </div>
        );
    }
}

Limiters.propTypes = {
};
