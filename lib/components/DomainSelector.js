import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import DropdownButton from './DropdownButton';
import MenuItem from './MenuItem';
import translate from '../higherOrderComponents/translate';

const DomainSelector = ({ domain, availableDomains, allDomains, isLogged, text, onChangeDomain }) => {
    if (isLogged && allDomains.length === 0) {
        return <DropdownButton
            id="domain"
            title={text.noDomain}
            tooltip={text.noDomainTooltip}
            tooltipPlacement="top"
        />;
    }
    if(allDomains.length === 0) {
        return <span/>;
    }
    console.log({domain});
    console.log({text});
    const title = (
        <span>
            {domain === 'ALL' ? text.ALL : domain} {
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
                    >{domain === 'ALL' ? text.ALL : domain} {
                        isLogged ? (
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
    isLogged: PropTypes.bool.isRequired,
    text: PropTypes.object,
    onChangeDomain: PropTypes.func.isRequired
};

DomainSelector.defaultProps = {
    availableDomains: [],
    allDomains: [],
    text: {
        noDomain: 'Aucun domaine',
        noDomainTooltip: 'Vous n\'avez accès à aucun domaine. Si vous pensez qu\'il s\'agit d\'une erreur, contactez-nous.',
        title: 'Choisissez le domaine de votre recherche.',
        available: 'Vous avez accès à ce domaine',
        unavailable: 'Vous n\'avez pas accès à ce domaine',
        ALL: 'all',
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
