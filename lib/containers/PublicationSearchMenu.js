import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import PublicationSearchMenu from '../components/PublicationSearchMenu';

function mapStateToProps(state) {
    return {
        resultShown: state.userInterface.resultShown
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showResult: actions.showResult
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationSearchMenu);
