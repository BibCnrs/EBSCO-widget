import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import * as fromState from '../selectors';

export const SearchDomains = ({
    availableUserDomains,
    currentDomain,
    onChangeDomain,
    currentLocation,
}) => {
    if (currentLocation === 'metadore') {
        return null;
    }

    return (
        <div className="search-domains">
            {availableUserDomains.map((domain, index) => (
                <div
                    tabIndex={index}
                    role="button"
                    aria-label={`Change search domain to ${domain}`}
                    key={domain}
                    className={`search-domains_chip ${
                        domain === currentDomain ? 'active' : ''
                    }`}
                    onClick={() => onChangeDomain(domain)}
                    onKeyDown={() => onChangeDomain(domain)}
                >
                    {domain}
                </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchDomains);
