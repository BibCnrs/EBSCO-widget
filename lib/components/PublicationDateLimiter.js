import React, { Component, PropTypes } from 'react';
import RcSlider from 'rc-slider';
import NumberInput from './NumberInput';

export default class PublicationLimiters extends Component {
    render() {
        const { publicationDate, onLimitSearch, min, max } = this.props;
        const { from, to } = publicationDate;

        return (
            <div className="publication-date-limiter">
                <div className="boundaries">
                    <NumberInput
                        className="from"
                        type="number"
                        max={9999}
                        min={0}
                        value={from || min}
                        onApply={() => onLimitSearch()}
                        onChange={ (e) => this.handleChange(e, to)}
                    />
                    <label className="title">Date de publication</label>
                    <NumberInput
                        className="to"
                        type="number"
                        max={9999}
                        min={0}
                        value={to || max}
                        onApply={() => onLimitSearch()}
                        onChange={(e) => this.handleChange(from, e)}
                    />
                </div>
                <div className="slider">
                    <RcSlider
                        value={[from || min, to || max]}
                        min={min}
                        max={max}
                        step={1}
                        range={true}
                        onChange={ (values) => this.handleChange(
                            values[0],
                            values[1]
                        )}
                        onAfterChange={ () => onLimitSearch()}
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

PublicationLimiters.propTypes = {
    publicationDate: PropTypes.object.isRequired,
    onLimitSearch: PropTypes.func.isRequired,
    onChangeLimiter: PropTypes.func.isRequired
};
