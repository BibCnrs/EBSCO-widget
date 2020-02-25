import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import ArticleSearchInputList from '../components/ArticleSearchInputList';
import * as fromState from '../selectors';

function mapStateToProps(state) {
    const queries = fromState.getCurrentQueryList(state);

    return {
        queries,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addQuery: actions.addQuery,
            removeQuery: actions.removeQuery,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ArticleSearchInputList);
