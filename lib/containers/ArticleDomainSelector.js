import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import DomainSelector from '../components/DomainSelector';

function mapStateToProps(state) {
    const { article, available } = state.domains;

    return {
        allDomains: available,
        availableDomains: available,
        domain: article
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeDomain: actions.article.changeDomain
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DomainSelector);
