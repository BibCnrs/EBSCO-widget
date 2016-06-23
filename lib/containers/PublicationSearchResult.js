import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import createRecordListContainer from './createRecordListContainer';
import createPagination from './createPagination';
import SortSelector from './PublicationSortSelector';
import createResultsPerPageSelector from './createResultsPerPageSelector';
import SearchResult from '../components/SearchResult';
import * as fromSearchResult from '../reducers/searchResult';

function mapStateToProps(state) {
    const searchResult = state.searchResult;

    return {
        ...fromSearchResult.getPaginationData(searchResult, 'publication'),
        RecordList: createRecordListContainer('publication'),
        Pagination: createPagination('publication'),
        SortSelector,
        ResultsPerPageSelector: createResultsPerPageSelector('publication')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
