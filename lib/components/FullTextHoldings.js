import React, { PropTypes } from 'react';

const FullTextHolding = ({ data = [] }) => {
    return (
        <ul className="fulltext-holdings">
            {data.map((fullTextHolding, key) => (
                <li key={key}>
                    <a href={fullTextHolding.url} target="_blank">{fullTextHolding.name}</a> {
                        fullTextHolding.coverage ? fullTextHolding.coverage.map((coverage) => {
                            return `${coverage.start} - ${coverage.end}`;
                        })
                        .join(', ') : ''
                    } {
                        fullTextHolding.embargo ?
                            `(embargo: ${fullTextHolding.embargo.value} ${fullTextHolding.embargo.unit})`
                        : null
                    }
                </li>
            ))}
        </ul>
    );
};

FullTextHolding.propTypes = {
    data: PropTypes.array
};

export default FullTextHolding;
