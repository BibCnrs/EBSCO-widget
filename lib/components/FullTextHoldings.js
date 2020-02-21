import PropTypes from 'prop-types';
import React from 'react';
import { DropdownButton } from 'react-bootstrap';

import FullTextHolding from './FullTextHolding';

const FullTextHoldings = ({ data = [], title, index }) => {
    const identifiant = `dropdownConsult${index}`;
    return (
        <DropdownButton
            id={identifiant}
            className="consult-button"
            title={title}
        >
            {data.map((fullTextHolding, key) => (
                <span key={key} className="dropdown-item">
                    <FullTextHolding title={title} {...fullTextHolding} />
                </span>
            ))}
        </DropdownButton>
    );
};

FullTextHoldings.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

export default FullTextHoldings;
