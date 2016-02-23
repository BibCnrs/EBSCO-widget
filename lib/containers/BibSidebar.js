import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import BibSidebar from '../components/BibSidebar';

function mapStateToProps(state, ownProps) {
    const { sidebarContent, mainContent } = ownProps;
    const { resultShown, limiterShown } = state.userInterface;

    return {
        sidebarContent,
        mainContent,
        resultShown,
        limiterShown
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showLimiter: actions.showLimiter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BibSidebar);
