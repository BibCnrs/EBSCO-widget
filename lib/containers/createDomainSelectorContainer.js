import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import DomainSelector from '../components/DomainSelector';
import * as fromState from '../reducers';

const createDomainSelectorContainer = (category) => {

    function mapStateToProps(state) {
        const all = fromState.getAllDomains(state, category);
        const available = fromState.getAvailableDomains(state);
        const domain = fromState.getCurrentDomain(state);

        return {
            allDomains: all,
            availableDomains: available,
            domain
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            onChangeDomain: (domain) => actions.changeDomain(category, domain)
        }, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(DomainSelector);
};

export default createDomainSelectorContainer;
