'use strict';

import React, { Component, PropTypes } from 'react';
import RcSlider from 'rc-slider';
import DatePicker from 'react-input-calendar';

export default class Limiters extends Component {
    render() {
        const { publicationDate, hasChanged, onLimitSearch, onChangeLimiter } = this.props;
        const { from, to } = publicationDate;
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
                        date={from}
                        onChange={ (date) => (this.handleChange(date, to), hasChanged && onLimitSearch())}
                        minView={1}
                    />
                </div>
                <div>
                    Jusqu&#39;a
                    <DatePicker
                        style={pickerStyle}
                        format="MM/YYYY"
                        computableFormat="YYYY-MM"
                        date={to}
                        onChange={(date) => (this.handleChange(from, date), hasChanged && onLimitSearch())}
                        minView={1}
                    />
                </div>
                <div className="slider">
                    <RcSlider
                        value={[parseInt(from.substr(0, 4)), parseInt(to.substr(0, 4))]}
                        min={1000}
                        max={max}
                        step={1}
                        range={true}
                        onChange={ (values) => this.handleChange(
                            `${values[0]}-${from.substr(-2)}`,
                            `${values[1]}-${to.substr(-2)}`
                        )}
                        onAfterChange={ () => hasChanged && onLimitSearch()}
                    />
                </div>
            </div>
        );
    }
    handleChange(newFrom, newTo) {
        const { publicationDate, onChangeLimiter } = this.props;
        const { from, to } = publicationDate;
        if (newFrom === from && newTo === to) { return; }
        onChangeLimiter('publicationDate', { from: newFrom, to: newTo });
    }
}

Limiters.propTypes = {
};
