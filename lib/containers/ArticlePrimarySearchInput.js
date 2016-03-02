import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import PrimarySearchInput from '../components/PrimarySearchInput';
import ArticleFieldSelector from './ArticleFieldSelector';
import ArticleDomainSelector from './ArticleDomainSelector';

function mapStateToProps(state) {
    const { term, domain } = state.article.search;

    return {
        term,
        domain,
        fieldSelector: <ArticleFieldSelector/>,
        domainSelector: <ArticleDomainSelector/>
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeTerm: actions.article.changeTerm,
        onSearchTerm: actions.article.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PrimarySearchInput);
