import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordList from './A2zRecordList';
import createPagination from './createPagination';
import createResultsPerPageSelector from './createResultsPerPageSelector';
import SearchResult from '../components/SearchResult';
import * as fromSearchResult from '../reducers/searchResult';

function mapStateToProps(state) {
    const searchResult = state.searchResult;

    return {
        ...fromSearchResult.getPaginationData(searchResult, 'a2z'),
        RecordList,
        Pagination: createPagination('a2z'),
        ResultsPerPageSelector: createResultsPerPageSelector('a2z')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
