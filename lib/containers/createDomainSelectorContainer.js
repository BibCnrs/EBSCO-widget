import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import DomainSelector from '../components/DomainSelector';
import * as fromState from '../selectors';

const createDomainSelectorContainer = category => {
    function mapStateToProps(state) {
        const allDomains = fromState.getAllDomains(state, category);
        const availableDomains = fromState.getAvailableDomains(state);
        const all =
            category === 'database' ? ['ALL', ...allDomains] : allDomains;
        const available =
            category === 'database'
                ? ['ALL', ...availableDomains]
                : availableDomains;
        const domain = fromState.getCurrentDomain(state);
        const isLogged = fromState.isUserLogged(state);

        return {
            allDomains: all,
            availableDomains: available,
            isLogged,
            domain,
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators(
            {
                onChangeDomain: domain =>
                    actions.changeDomain(category, domain),
            },
            dispatch,
        );
    }

    return connect(mapStateToProps, mapDispatchToProps)(DomainSelector);
};

export default createDomainSelectorContainer;
