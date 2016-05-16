import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import DomainSelector from '../components/DomainSelector';

function mapStateToProps(state) {
    const { a2z, all, available } = state.domains;

    return {
        allDomains: all,
        availableDomains: available,
        domain: a2z
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeDomain: actions.a2z.changeDomain
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainSelector);
