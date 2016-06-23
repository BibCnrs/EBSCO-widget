import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import createRecordList from './createRecordList';
import createPagination from './createPagination';
import SortSelector from './ArticleSortSelector';
import createResultsPerPageSelector from './createResultsPerPageSelector';
import SearchResult from '../components/SearchResult';
import * as fromSearchResult from '../reducers/searchResult';

function mapStateToProps(state) {
    const searchResult = state.searchResult;

    return {
        ...fromSearchResult.getPaginationData(searchResult, 'article'),
        RecordList: createRecordList('article'),
        Pagination: createPagination('article'),
        SortSelector,
        ResultsPerPageSelector: createResultsPerPageSelector('article')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
