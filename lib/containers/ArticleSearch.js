import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import ArticleSearch from '../components/ArticleSearch';
import ArticleFieldSelector from './ArticleFieldSelector';

function mapStateToProps(state) {
    const { status, error, queries, domain } = state.article.search;

    return {
        status,
        error,
        term: queries[0].term,
        domain,
        fieldSelector: <ArticleFieldSelector/>
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSearchTerm: actions.article.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleSearch);
