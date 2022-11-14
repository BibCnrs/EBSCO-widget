import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import * as fromState from '../selectors';
import translate from '../higherOrderComponents/translate';

export const SearchDomains = ({
    availableUserDomains,
    currentDomain,
    onChangeDomain,
    currentLocation,
    text,
}) => {
    if (currentLocation === 'metadore') {
        return null;
    }

    return (
        <div className="search-domains">
            {availableUserDomains.map(domain => (
                <button
                    aria-label={`${text.label} ${domain}`}
                    key={domain}
                    className={`search-domains_chip ${
                        domain === currentDomain ? 'active' : ''
                    }`}
                    onClick={() => onChangeDomain(domain)}
                    aria-pressed={domain === currentDomain}
                >
                    {domain}
                </button>
            ))}
        </div>
    );
};

function mapStateToProps(state) {
    const availableUserDomains = fromState.getAvailableDomains(state);
    const currentDomain = fromState.getCurrentDomain(state);
    const isLogged = fromState.isUserLogged(state);
    const currentLocation = fromState.getLocation(state);
    return {
        availableUserDomains,
        currentDomain,
        isLogged,
        currentLocation,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onChangeDomain: domain => actions.changeAllSearchDomain(domain),
        },
        dispatch,
    );
}

SearchDomains.propTypes = {
    availableUserDomains: PropTypes.arrayOf(PropTypes.string),
    currentDomain: PropTypes.string,
    onChangeDomain: PropTypes.func,
    currentLocation: PropTypes.string,
    text: PropTypes.object,
};

export default translate(
    connect(mapStateToProps, mapDispatchToProps)(SearchDomains),
    'SearchDomains',
);
