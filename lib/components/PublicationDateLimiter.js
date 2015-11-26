'use strict';

import React, { Component, PropTypes } from 'react';
import RcSlider from 'rc-slider';
import DatePicker from 'react-input-calendar';

export default class Limiters extends Component {
    render() {
        let { fromPublicationDate, toPublicationDate, onLimitPublicationDate, onChangePublicationDate } = this.props;
        const max = new Date().getFullYear() + 1;
        const pickerStyle = {display: 'inline-block'};
        return (
            <div className="publication-date-limiter">
                <h5>Date de publication</h5>
                <div>
                    Depuis
                    <DatePicker
                        style={pickerStyle}
                        format="MM/YYYY"
                        computableFormat="YYYY-MM"
                        date={fromPublicationDate}
                        onChange={ (date) => onLimitPublicationDate(date, toPublicationDate)}
                        minView={1}
                    />
                </div>
                <div>
                    Jusqu&#39;a
                    <DatePicker
                        style={pickerStyle}
                        format="MM/YYYY"
                        computableFormat="YYYY-MM"
                        date={toPublicationDate}
                        onChange={ (date) => onLimitPublicationDate(fromPublicationDate, date)}
                        minView={1}
                    />
                </div>
                <div className="slider">
                    <RcSlider
                        value={[parseInt(fromPublicationDate.substr(0, 4)), parseInt(toPublicationDate.substr(0, 4))]}
                        min={1000}
                        max={max}
                        step={1}
                        range={true}
                        onChange={ (values) => onChangePublicationDate(`${values[0]}-${fromPublicationDate.substr(-2)}`, `${values[1]}-${toPublicationDate.substr(-2)}`)}
                        onAfterChange={ (values) => onLimitPublicationDate(`${values[0]}-${fromPublicationDate.substr(-2)}`, `${values[1]}-${toPublicationDate.substr(-2)}`)}
                        // onDragEnd={(e) => console.log(e)}
                    />
                </div>
            </div>
        );
    }
}

Limiters.propTypes = {
};
