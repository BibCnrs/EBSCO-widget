import React, { PropTypes } from 'react';

const SearchableField = ({ firstValue, searchable, lastValue, linkedSearch }) => {
    return (
        <div>
            {firstValue ? <span>{firstValue} </span> : null}
            {searchable.map((searchable, index) => (
                <span key={index}>
                    <a href="#" onClick={() => linkedSearch(searchable.term, searchable.field)}>{searchable.value}</a>
                    {searchable.indice ? <sup>{searchable.indice}</sup> : null}
                    {index < searchable.length - 1 ? '/' : ''}
                </span>
            ))}
            {lastValue ? <span> {lastValue}</span> : null}
        </div>
    );
};

SearchableField.propTypes = {
    firstValue: PropTypes.string,
    searchable: PropTypes.array.isRequired,
    lastValue: PropTypes.string
};

export default SearchableField;
