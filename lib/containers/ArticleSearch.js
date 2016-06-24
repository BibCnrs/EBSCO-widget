import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Search from '../components/Search';
import SearchInput from '../containers/ArticleSearchInputList';

function mapStateToProps(state) {
    const { status, error, queries, domain } = state.search.article;

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
        onSearchTerm: (...args) => actions.searchTerm('article', ...args)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
