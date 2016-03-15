import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import SearchInput from '../components/SearchInput';
import ArticleFieldSelector from './ArticleFieldSelector';
import BooleanSelector from './BooleanSelector';
import ArticleDomainSelector from './ArticleDomainSelector';

function mapStateToProps(state, { index }) {
    const { queries, domain } = state.article.search;
    const { term } = queries[index || 0];

    return {
        index,
        domain,
        value: term,
        placeholder: 'Rechercher des articles, des chapitres de livre...',
        buttonAfter: <ArticleFieldSelector index={index}/>,
        buttonBefore: index ? <BooleanSelector index={index}/> : <ArticleDomainSelector/>
    };
}

function mapDispatchToProps(dispatch, { index }) {
    return bindActionCreators({
        onChange: (term) => actions.article.changeQuery(term, 'term', index),
        onApply: actions.article.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
