import React, { PropTypes } from 'react';

const FullTextHolding = ({ data }) => {
    return (
        <span>
            <a href={data.url} target="_blank">{data.name}</a> {
                data.coverage ? data.coverage.map((coverage) => {
                    return `${coverage.start} - ${coverage.end}`;
                })
                .join(', ') : ''
            } {
                data.embargo ?
                    `(embargo: ${data.embargo.value} ${data.embargo.unit})`
                : null
            }
        </span>
    );
};

FullTextHolding.propTypes = {
    data: PropTypes.object
};

export default FullTextHolding;
