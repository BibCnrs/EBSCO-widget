import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import ArticleSearch from '../components/ArticleSearch';
import ArticleFieldSelector from './ArticleFieldSelector';

function mapStateToProps(state) {
    const domains = state.article.domains;
    const { status, error, queries, domain } = state.article.search;

    return {
        status,
        error,
        term: queries[0].term,
        domains,
        domain,
        fieldSelector: <ArticleFieldSelector/>
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeTerm: actions.article.changeTerm,
        onChangeDomain: actions.article.changeDomain,
        onSearchTerm: actions.article.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleSearch);
