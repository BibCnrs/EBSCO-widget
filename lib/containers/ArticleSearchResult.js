import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import createRecordListContainer from './createRecordListContainer';
import createPagination from './createPagination';
import createSortSelectorContainer from './createSortSelectorContainer';
import createResultsPerPageSelector from './createResultsPerPageSelector';
import SearchResult from '../components/SearchResult';
import * as fromSearchResult from '../reducers/searchResult';

function mapStateToProps(state) {
    const searchResult = state.searchResult;

    return {
        ...fromSearchResult.getPaginationData(searchResult, 'article'),
        RecordList: createRecordListContainer('article'),
        Pagination: createPagination('article'),
        SortSelector: createSortSelectorContainer('article'),
        ResultsPerPageSelector: createResultsPerPageSelector('article')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
