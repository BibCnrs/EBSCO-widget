import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordList from './ArticleRecordList';
import Pagination from './ArticlePagination';
import SortSelector from './ArticleSortSelector';
import ResultsPerPageSelector from './ArticleResultsPerPageSelector';
import SearchResult from '../components/SearchResult';

function mapStateToProps(state) {
    const searchResult = state.article.searchResult;
    const articles = searchResult[searchResult.currentPage];
    const first = articles && articles[0] && articles[0].id;
    const last = Array.isArray(articles) && articles.slice(-1)[0] && articles.slice(-1)[0].id;
    return {
        first,
        last,
        totalHits: searchResult.totalHits,
        maxPage: searchResult.maxPage,
        RecordList,
        Pagination,
        SortSelector,
        ResultsPerPageSelector
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
