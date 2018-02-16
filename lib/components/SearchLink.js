import PropTypes from 'prop-types';
import React from 'react';

const SearchLink = ({ value, term, field, linkedSearch }) => {
    return (
        <a href="#" onClick={() => linkedSearch(term, field)}>
            {value}
        </a>
    );
};

SearchLink.propTypes = {
    value: PropTypes.string.isRequired,
    term: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    linkedSearch: PropTypes.func.isRequired,
};

export default SearchLink;
