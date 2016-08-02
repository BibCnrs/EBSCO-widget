import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import PublicationSearchMenu from '../components/PublicationSearchMenu';
import * as fromState from '../reducers';

function mapStateToProps(state) {
    return {
        resultShown: fromState.isResultShown(state)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showResult: actions.showResult
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationSearchMenu);
