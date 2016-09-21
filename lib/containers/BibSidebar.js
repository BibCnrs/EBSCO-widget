import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import BibSidebar from '../components/BibSidebar';
import * as fromState from '../selectors';

function mapStateToProps(state, ownProps) {
    const { sidebarContent, mainContent } = ownProps;
    const resultShown = fromState.isResultShown(state);
    const limiterShown = fromState.isLimiterShown(state);


    return {
        sidebarContent,
        mainContent,
        resultShown,
        limiterShown
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showSidebar: actions.showSidebar
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BibSidebar);
