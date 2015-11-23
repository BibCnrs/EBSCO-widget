'use strict';

import React, { Component, PropTypes } from 'react';
import RcSlider from 'rc-slider';
import DatePicker from 'react-input-calendar';

export default class Limiters extends Component {
    render() {
        let { fromPublicationDate, toPublicationDate, onLimitPublicationDate } = this.props;
        fromPublicationDate = new Date(fromPublicationDate);
        toPublicationDate = new Date(toPublicationDate);
        return (
            <div className="publication-date-limiter">
                <label>Date de publication</label>
                <RcSlider
                    value={[fromPublicationDate.getFullYear(), toPublicationDate.getFullYear()]}
                    min={1000}
                    max={3000}
                    step={1}
                    range={true}
                    onChange={ (values) => onLimitPublicationDate(new Date(values[0], 11, 31), new Date(values[1], 11, 31))}
                />

                <DatePicker date={fromPublicationDate} onChange={ (date) => onLimitPublicationDate(date, toPublicationDate)} />
                <DatePicker date={toPublicationDate} onChange={ (date) => onLimitPublicationDate(fromPublicationDate, date)} />
            </div>
        );
    }
}

Limiters.propTypes = {
};
