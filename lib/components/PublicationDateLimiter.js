import PropTypes from 'prop-types';
import React, { Component } from 'react';

import NumberInput from './NumberInput';
import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';

export class PublicationDateLimiter extends Component {
    render() {
        const { publicationDate, min, max, text, onApply } = this.props;
        const { from, to } = publicationDate;

        return (
            <div className="publication-date-limiter">
                <label className="title">{text.date}</label>
                <div className="boundaries">
                    <NumberInput
                        className="from"
                        type="number"
                        max={9999}
                        min={0}
                        value={from || min}
                        onApply={() => onApply()}
                        onChange={e => this.handleChange(e, to)}
                        aria-label={text.fromLabel}
                    />
                    <label className="to">{text.to}</label>
                    <NumberInput
                        className="to"
                        type="number"
                        max={9999}
                        min={0}
                        value={to || max}
                        onApply={() => onApply()}
                        onChange={e => this.handleChange(from, e)}
                        aria-label={text.toLabel}
                    />
                    <BibButton
                        bsStyle="link"
                        icon={{ name: 'times' }}
                        aria-label={text.resetDate}
                        onClick={() => {
                            this.handleChange(1000, new Date().getFullYear());
                            onApply();
                        }}
                    />
                </div>
            </div>
        );
    }
    handleChange(newFrom, newTo) {
        const { publicationDate, onChangeLimiter, min, max } = this.props;
        const { from, to } = publicationDate;
        if (newFrom === from && newTo === to) {
            return;
        }
        onChangeLimiter('publicationDate', {
            from: newFrom || min,
            to: newTo || max,
        });
    }
}

PublicationDateLimiter.propTypes = {
    publicationDate: PropTypes.object.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    text: PropTypes.object,
    onApply: PropTypes.func.isRequired,
    onChangeLimiter: PropTypes.func.isRequired,
};

PublicationDateLimiter.defaultProps = {
    text: {
        date: 'Date',
        to: 'à',
    },
};

export default translate(PublicationDateLimiter, 'PublicationDateLimiter');
