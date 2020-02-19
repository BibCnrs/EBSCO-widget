import PropTypes from 'prop-types';
import React from 'react';
import { DropdownButton } from 'react-bootstrap';
import BookmarkButton from '../containers/BookmarkButton';

import FullTextHolding from './FullTextHolding';

const FullTextHoldings = ({ title, data = [], text, index }) => {
    if (data.length === 1) {
        return <BookmarkButton title={title} url={data[0].url} />;
    }
    return (
        <DropdownButton
            id={`dropdownConsult${index}`}
            title={text.consult}
            className="consult-button"
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
    text: PropTypes.object,
    index: PropTypes.number.isRequired,
};

export default FullTextHoldings;
