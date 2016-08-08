import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Icon from 'react-fa';

const DomainSelector = ({ domain, availableDomains, allDomains, onChangeDomain }) => {
    const title = (
        <span>
            {domain} {
                allDomains.length > 0 ? (
                    availableDomains.indexOf(domain) !== -1 ? <Icon name="check"/> : <Icon name="close"/>
                ) : (
                    ''
                )
            }
        </span>
    );
    return (
        <DropdownButton
            id="domain"
            name="domain"
            title={title}
            onChange={(data) => onChangeDomain(data.value)}
            disabled={!allDomains.length}
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
};

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
