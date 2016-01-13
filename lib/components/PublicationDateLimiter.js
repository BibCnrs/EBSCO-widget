import React, { Component, PropTypes } from 'react';
import RcSlider from 'rc-slider';
import DatePicker from 'react-input-calendar';

export default class Limiters extends Component {
    render() {
        const { publicationDate, hasChanged, onLimitSearch } = this.props;
        const { from, to } = publicationDate;
        const max = new Date().getFullYear() + 1;
        return (
            <div className="publication-date-limiter">
                <h5>Date de publication</h5>
                <div className="boundaries">
                    <input
                        className="from"
                        type="number"
                        max={max}
                        min={0}
                        value={from}
                        onChange={ (value) => (this.handleChange(value, to), hasChanged && onLimitSearch())}
                    />
                    <input
                        className="to"
                        type="number"
                        max={max}
                        min={0}
                        value={to}
                        onChange={(value) => (this.handleChange(from, value), hasChanged && onLimitSearch())}
                    />
                </div>
                <div className="slider">
                    <RcSlider
                        value={[from, to]}
                        min={1000}
                        max={max}
                        step={1}
                        range={true}
                        onChange={ (values) => this.handleChange(
                            values[0],
                            values[1]
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
    publicationDate: PropTypes.object.isRequired,
    hasChanged: PropTypes.bool.isRequired,
    onLimitSearch: PropTypes.func.isRequired,
    onChangeLimiter: PropTypes.func.isRequired
};
