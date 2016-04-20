import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Search from '../components/Search';
import SearchInput from '../containers/ArticleSearchInputList';

function mapStateToProps(state) {
    const { status, error, queries, domain } = state.article.search;

    return {
        status,
        error,
        term: queries[0].term,
        domain,
        SearchInput
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSearchTerm: actions.article.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
