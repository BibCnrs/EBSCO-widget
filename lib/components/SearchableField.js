import React, { PropTypes } from 'react';

const SearchableField = ({ firstValue, searchable, lastValue }) => {
    return (
        <p>
            {firstValue ? <span>{firstValue} </span> : null}
            {searchable.map((searchable, index) => (
                <span>
                    <a href="#">{searchable.value}</a>
                    {searchable.indice ? <sup>{searchable.indice}</sup> : null}
                    {index < searchable.length - 1 ? '/' : ''}
                </span>
            ))}
            {lastValue ? <span> {lastValue}</span> : null}
        </p>
    );
};

SearchableField.propTypes = {
    firstValue: PropTypes.string,
    searchable: PropTypes.array.isRequired,
    lastValue: PropTypes.string
};

export default SearchableField;
