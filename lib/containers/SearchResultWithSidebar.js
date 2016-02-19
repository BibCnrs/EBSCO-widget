import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import SearchResultWithSidebar from '../components/SearchResultWithSidebar';
import { routeActions } from 'react-router-redux';

function mapStateToProps(state) {
    return {
        resultShown: state.userInterface.resultShown,
        limiterShown: state.userInterface.limiterShown,
        limiters: state.search.limiters,
        maxPage: state.searchResult.maxPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showLimiter: actions.showLimiter,
        push: routeActions.push
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultWithSidebar);
