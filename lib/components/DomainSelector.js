import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import DropdownButton from './DropdownButton';
import MenuItem from './MenuItem';
import translate from '../higherOrderComponents/translate';

const DomainSelector = ({ domain, availableDomains, allDomains, text, onChangeDomain }) => {
    if(allDomains.length === 0) {
        return <span/>;
    }
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
            tooltip={ text.title }
            tooltipPlacement="top"
            onChange={(data) => onChangeDomain(data.value)}
            disabled={!allDomains.length}
        >
            {allDomains.map((domain, index) => {
                const isAvailable = availableDomains.length > 0 ? (
                    availableDomains.indexOf(domain) !== -1
                ) : null;
                return (
                    <MenuItem
                        id={domain}
                        tooltip={ `${text[domain] || domain} ${availableDomains.length > 0 ? (
                            isAvailable ? text.available : text.unavailable
                        ) : ''}`
                        }
                        tooltipPlacement="right"
                        onClick={() => onChangeDomain(domain)}
                        key={index}
                        value={domain}
                    >{domain} {
                        availableDomains.length > 0 ? (
                            isAvailable ? <Icon name="check"/> : <Icon name="close"/>
                        ) : (
                            ''
                        )
                    }</MenuItem>
                );
            })}
        </DropdownButton>
    );
};

DomainSelector.propTypes = {
    domain: PropTypes.string,
    availableDomains: PropTypes.array,
    allDomains: PropTypes.array,
    text: PropTypes.object,
    onChangeDomain: PropTypes.func.isRequired
};

DomainSelector.defaultProps = {
    availableDomains: [],
    allDomains: [],
    text: {
        title: 'Choisissez le domaine de votre recherche.',
        available: 'Vous avez accès à ce domaine',
        unavailable: 'Vous n\'avez pas accès à ce domaine',
        INSB: 'biologie',
        INC: 'chimie',
        INEE: 'écologie & environnement',
        INSHS: 'homme & société',
        INSIS: 'ingénierie & systèmes',
        INSMI: 'mathématiques',
        IN2P3: 'nucléaire & particules',
        INP: 'physique',
        INS2I: 'sciences de l\'information',
        INSU: 'terre & univers'
    }
};

export default translate(DomainSelector);
