import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import SearchInput from './SearchInput';

const PrimarySearchInput = ({ term, domains, domain, onChangeDomain, onChangeTerm, onSearchTerm, fieldSelector }) => {
    const selectDomain = (
        <DropdownButton
            id="domain"
            name="domain"
            title={domain}
            onChange={(data) => onChangeDomain(data.value)}
        >
            {domains.map((domain, index) => (
                <MenuItem
                    id={domain}
                    onClick={() => onChangeDomain(domain)}
                    key={index}
                    value={domain}
                >{domain}</MenuItem>))}
        </DropdownButton>
    );

    return (
        <SearchInput
            type="text"
            placeholder="Rechercher..."
            value={term}
            onChange={onChangeTerm}
            onApply={() => onSearchTerm(term, domain)}
            buttonBefore={selectDomain}
            buttonAfter={fieldSelector}
        />
    );
};

PrimarySearchInput.propTypes = {
    term: PropTypes.string.isRequired,
    domain: PropTypes.string,
    domains: PropTypes.array.isRequired,
    onSearchTerm: PropTypes.func.isRequired,
    onChangeTerm: PropTypes.func.isRequired,
    onChangeDomain: PropTypes.func.isRequired
};

export default PrimarySearchInput;
