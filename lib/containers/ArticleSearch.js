import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Search from '../components/Search';
import SearchInput from '../containers/ArticleSearchInputList';
import * as fromQueryList from '../reducers/queryList';

function mapStateToProps(state) {
    const { status, error, domain } = state.search.article;
    const term = fromQueryList.getTerm(state.queryList, 'article');

    return {
        status,
        error,
        term,
        domain,
        SearchInput
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSearchTerm: (...args) => actions.searchTerm('article', ...args)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
