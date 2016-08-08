import React, { PropTypes } from 'react';

import parseCoverageDate from '../services/parseCoverageDate';
import translate from '../higherOrderComponents/translate';

export const FullTextHolding = ({ url, name, coverage, embargo, text }) => {
    return (
        <span>
            <a href={url} target="_blank">{name}</a> {
                coverage ? coverage.map((coverage) => {
                    const start = parseCoverageDate(text, coverage.start);
                    const end = parseCoverageDate(text, coverage.end);
                    return `${start} - ${end}`;
                })
                .join(', ') : ''
            } {
                embargo ?
                    `(embargo: ${embargo.value} ${embargo.unit})`
                : null
            }
        </span>
    );
};

FullTextHolding.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    coverage: PropTypes.array,
    embargo: PropTypes.object,
    text: PropTypes.object
};

FullTextHolding.defaultProps = {
    text: {
        date: '<day>/<month>/<year>',
        now: 'présent'
    }
};

export default translate(FullTextHolding);
