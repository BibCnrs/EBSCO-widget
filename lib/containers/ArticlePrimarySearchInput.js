import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import SearchInput from '../components/SearchInput';
import ArticleFieldSelector from './ArticleFieldSelector';
import ArticleDomainSelector from './ArticleDomainSelector';

function mapStateToProps(state) {
    const { term, domain } = state.article.search;

    return {
        value: term,
        domain,
        buttonAfter: <ArticleFieldSelector/>,
        buttonBefore: <ArticleDomainSelector/>
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChange: actions.article.changeTerm,
        onApply: actions.article.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
