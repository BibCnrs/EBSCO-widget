import { connect } from 'react-redux';

import Database from '../components/Database';
import * as fromState from '../selectors';
import actions from '../actions';

function mapStateToProps(state) {
    const databases = fromState.getSortedDatabases(state);
    const isLogged = fromState.isUserLogged(state);
    const language = fromState.getLanguage(state);
    const domain = fromState.getCurrentDomain(state);
    const apiUrl = fromState.getUrl(state);

    return {
        databases,
        isLogged,
        language,
        domain,
        apiUrl,
    };
}

const mapDispatchToProps = {
    clickDb: actions.clickDb,
};

export default connect(mapStateToProps, mapDispatchToProps)(Database);
