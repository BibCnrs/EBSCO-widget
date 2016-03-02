import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import SearchInput from '../components/SearchInput';
import ArticleFieldSelector from './ArticleFieldSelector';
import BooleanSelector from './BooleanSelector';

function mapStateToProps(state, { index }) {
    const { term, domain } = state.article.search;

    return {
        index,
        value: term,
        domain,
        buttonAfter: <ArticleFieldSelector index={index}/>,
        buttonBefore: <BooleanSelector index={index}/>
    };
}

function mapDispatchToProps(dispatch, { index }) {
    return bindActionCreators({
        onChange: (term) => actions.article.changeQueryTerm(term, index),
        onApply: actions.article.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
