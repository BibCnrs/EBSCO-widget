import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordList from './PublicationRecordList';
import Pagination from './PublicationPagination';
import SortSelector from './PublicationSortSelector';
import ResultsPerPageSelector from './PublicationResultsPerPageSelector';
import SearchResult from '../components/SearchResult';
import * as fromSearchResult from '../reducers/searchResult';

function mapStateToProps(state) {
    const searchResult = state.searchResult;

    return {
        ...fromSearchResult.getPaginationData(searchResult, 'publication'),
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
