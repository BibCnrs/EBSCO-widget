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
}) => {
    return (
        <div className="search-domains">
            {availableUserDomains.map(domain => (
                <div
                    key={domain}
                    className={`search-domains_chip ${
                        domain === currentDomain ? 'active' : ''
                    }`}
                    onClick={() => onChangeDomain(domain)}
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
    return {
        availableUserDomains,
        currentDomain,
        isLogged,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchDomains);
