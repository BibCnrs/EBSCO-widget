import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordList from './A2zRecordList';
import Pagination from './A2zPagination';
import ResultsPerPageSelector from './A2zResultsPerPageSelector';
import SearchResult from '../components/SearchResult';
import * as fromSearchResult from '../reducers/searchResult';

function mapStateToProps(state) {
    const searchResult = state.searchResult;

    return {
        ...fromSearchResult.getPaginationData(searchResult, 'a2z'),
        RecordList,
        Pagination,
        ResultsPerPageSelector
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
