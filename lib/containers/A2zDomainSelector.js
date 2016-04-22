import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import DomainSelector from '../components/DomainSelector';

function mapStateToProps(state) {
    const { domain, availableDomains } = state.a2z.search;

    return {
        availableDomains,
        domain
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeDomain: actions.a2z.changeDomain
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainSelector);
