import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ArticleRecordList from '../components/ArticleRecordList';

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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleRecordList);
