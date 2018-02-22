import { connect } from 'react-redux';

import Database from '../components/Database';
import * as fromState from '../selectors';
import actions from '../actions';

function mapStateToProps(state) {
    const language = fromState.getLanguage(state);
    const domain = fromState.getCurrentDomain(state);
    const databases = fromState.getSortedDatabases(state);

    return {
        databases,
        language,
        domain,
    };
}

const mapDispatchToProps = {
    clickDb: actions.clickDb,
};

export default connect(mapStateToProps, mapDispatchToProps)(Database);
