import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ArticleSearchResult from '../components/ArticleSearchResult';

function mapStateToProps(state) {
    const searchResult = state.searchResult;
    const records = searchResult[searchResult.currentPage];
    const first = records && records[0] && records[0].id;
    const last = Array.isArray(records) && records.slice(-1)[0] && records.slice(-1)[0].id;
    return {
        first,
        last,
        totalHits: searchResult.totalHits,
        maxPage: searchResult.maxPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleSearchResult);
