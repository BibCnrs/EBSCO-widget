import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import PrimarySearchInput from '../components/PrimarySearchInput';
import ArticleFieldSelector from './ArticleFieldSelector';

function mapStateToProps(state) {
    const domains = state.article.domains;
    const { term, domain } = state.article.search;

    return {
        term,
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

export default connect(mapStateToProps, mapDispatchToProps)(PrimarySearchInput);
