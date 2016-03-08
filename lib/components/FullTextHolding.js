import React, { PropTypes } from 'react';

const FullTextHolding = ({ url, name, coverage, embargo }) => {
    return (
        <span>
            <a href={url} target="_blank">{name}</a> {
                coverage ? coverage.map((coverage) => {
                    return `${coverage.start} - ${coverage.end}`;
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
    embargo: PropTypes.object
};

export default FullTextHolding;
