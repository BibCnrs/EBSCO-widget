import React, { PropTypes } from 'react';

const FullTextHolding = ({ data }) => {
    return (
        <li>
            <a href={data.url} target="_blank">{data.name}</a> {
                data.coverage.map((coverage) => {
                    return `${coverage.start} - ${coverage.end}`;
                })
                .join(', ')
            } {
                data.embargo ?
                    `(délai texte intégrale: ${data.embargo.value} ${data.embargo.unit})`
                : null
            }
        </li>
    );
};

FullTextHolding.propTypes = {
    data: PropTypes.object.isRequired
};

export default FullTextHolding;
