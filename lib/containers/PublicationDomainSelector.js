import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import DomainSelector from '../components/DomainSelector';

function mapStateToProps(state) {
    const domains = state.publication.domains;
    const { domain } = state.publication.search;

    return {
        domains,
        domain
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeDomain: actions.publication.changeDomain
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainSelector);
