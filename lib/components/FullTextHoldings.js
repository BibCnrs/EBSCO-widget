import React, { PropTypes } from 'react';
import FullTextHolding from './FullTextHolding';

const FullTextHoldings = ({ data = [] }) => {
    return (
        <ul className="fulltext-holdings">
            {data.map((fullTextHolding, key) => (
                <li key={key}>
                    <FullTextHolding { ...fullTextHolding }/>
                </li>
            ))}
        </ul>
    );
};

FullTextHoldings.propTypes = {
    data: PropTypes.array
};

export default FullTextHoldings;
