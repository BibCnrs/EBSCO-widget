import React, { PropTypes } from 'react';

import SearchInput from './SearchInput';

const PrimarySearchInput = ({ term, domain, onChangeTerm, onSearchTerm, fieldSelector, domainSelector }) => {
    return (
        <SearchInput
            type="text"
            placeholder="Rechercher..."
            value={term}
            onChange={onChangeTerm}
            onApply={() => onSearchTerm(term, domain)}
            buttonBefore={domainSelector}
            buttonAfter={fieldSelector}
        />
    );
};

PrimarySearchInput.propTypes = {
    term: PropTypes.string.isRequired,
    domain: PropTypes.string,
    domains: PropTypes.array.isRequired,
    fieldSelector: PropTypes.element.isRequired,
    domainSelector: PropTypes.element.isRequired,
    onSearchTerm: PropTypes.func.isRequired,
    onChangeTerm: PropTypes.func.isRequired,
    onChangeDomain: PropTypes.func.isRequired
};

export default PrimarySearchInput;
