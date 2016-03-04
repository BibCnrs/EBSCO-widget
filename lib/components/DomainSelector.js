import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const DomainSelector = ({ domain, availableDomains, onChangeDomain }) => (
    <DropdownButton
        id="domain"
        name="domain"
        title={domain}
        onChange={(data) => onChangeDomain(data.value)}
    >
        {availableDomains.map((domain, index) => (
            <MenuItem
                id={domain}
                onClick={() => onChangeDomain(domain)}
                key={index}
                value={domain}
            >{domain}</MenuItem>))}
    </DropdownButton>
);

DomainSelector.propTypes = {
    domain: PropTypes.string.isRequired,
    availableDomains: PropTypes.array.isRequired,
    onChangeDomain: PropTypes.func.isRequired
};

export default DomainSelector;
