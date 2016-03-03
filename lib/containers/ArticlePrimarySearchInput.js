import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import SearchInput from '../components/SearchInput';
import ArticleFieldSelector from './ArticleFieldSelector';
import ArticleDomainSelector from './ArticleDomainSelector';

function mapStateToProps(state) {
    const { queries, domain } = state.article.search;
    const { term } = queries[0];

    return {
        value: term,
        domain,
        buttonAfter: <ArticleFieldSelector/>,
        buttonBefore: <ArticleDomainSelector/>
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChange: (value) => actions.article.changeQuery(value, 'term'),
        onApply: actions.article.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
