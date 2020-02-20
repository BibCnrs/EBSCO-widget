import PropTypes from 'prop-types';
import React from 'react';
import { DropdownButton } from 'react-bootstrap';

import FullTextHolding from './FullTextHolding';

const FullTextHoldings = ({ data = [], index }) => {
    const identifiant = `dropdownConsult${index}`;
    return (
        <DropdownButton
            id={identifiant}
            className="consult-button"
            title={identifiant}
        >
            {data.map((fullTextHolding, key) => (
                <span key={key} className="dropdown-item">
                    <FullTextHolding {...fullTextHolding} />
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
