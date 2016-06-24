import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import DomainSelector from '../components/DomainSelector';

const createDomainSelectorContainer = (category) => {

    function mapStateToProps(state) {
        const { [category]: domain, all, available } = state.domains;

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
