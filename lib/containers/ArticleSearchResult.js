import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordList from './ArticleRecordList';
import Pagination from './ArticlePagination';
import SortSelector from './ArticleSortSelector';
import ResultsPerPageSelector from './ArticleResultsPerPageSelector';
import SearchResult from '../components/SearchResult';
import * as fromSearchResult from '../reducers/searchResult';

function mapStateToProps(state) {
    const searchResult = state.searchResult;

    return {
        ...fromSearchResult.getPaginationData(searchResult, 'article'),
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
