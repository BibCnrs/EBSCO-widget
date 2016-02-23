import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import SearchResultWithSidebar from '../components/SearchResultWithSidebar';

function mapStateToProps(state) {
    return {
        resultShown: state.userInterface.resultShown,
        limiterShown: state.userInterface.limiterShown,
        limiters: state.articleSearch.limiters,
        maxPage: state.articleSearchResult.maxPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showLimiter: actions.showLimiter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultWithSidebar);
