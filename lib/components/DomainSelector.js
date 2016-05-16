import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Icon from 'react-fa';

const DomainSelector = ({ domain, availableDomains, allDomains, onChangeDomain }) => (
    <DropdownButton
        id="domain"
        name="domain"
        title={domain || ''}
        onChange={(data) => onChangeDomain(data.value)}
    >
        {allDomains.map((domain, index) => (
            <MenuItem
                id={domain}
                onClick={() => onChangeDomain(domain)}
                key={index}
                value={domain}
            >{domain} {
                availableDomains.length > 0 ? (
                    availableDomains.indexOf(domain) !== -1 ? <Icon name="check"/> : <Icon name="close"/>
                ) : (
                    ''
                )
            }</MenuItem>))}
    </DropdownButton>
);

DomainSelector.propTypes = {
    domain: PropTypes.string,
    availableDomains: PropTypes.array,
    allDomains: PropTypes.array,
    onChangeDomain: PropTypes.func.isRequired
};

DomainSelector.defaultProps = {
    availableDomains: [],
    allDomains: []
};

export default DomainSelector;
