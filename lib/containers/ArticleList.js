import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ArticleList from '../components/ArticleList';

function mapStateToProps(state) {
    const searchResult = state.article.searchResult;

    return {
        articles: searchResult[searchResult.currentPage]
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
