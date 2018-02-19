import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Search from '../components/Search';
import SearchInput from '../containers/ArticleSearchInputList';
import SearchMenu from '../containers/ArticleSearchMenu';
import * as fromState from '../selectors';

function mapStateToProps(state) {
    const { status, error } = fromState.getCurrentSearch(state);
    const term = fromState.getQueryListTerm(state);

    return {
        status,
        error,
        term,
        SearchInput,
        SearchMenu,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onSearch: (...args) => actions.search('article', ...args),
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
