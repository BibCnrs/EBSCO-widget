import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import DomainSelector from '../components/DomainSelector';

function mapStateToProps(state) {
    const domains = state.article.domains;
    const { domain } = state.article.search;

    return {
        domains,
        domain
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeDomain: actions.article.changeDomain
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainSelector);
