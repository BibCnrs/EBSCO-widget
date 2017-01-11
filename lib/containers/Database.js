import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Database from '../components/Database';
import * as fromState from '../selectors';

function mapStateToProps(state) {
    const language = fromState.getLanguage(state);
    const domain = fromState.getCurrentDomain(state);

    return {
        databases: state.databases,
        language,
        domain
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Database);
