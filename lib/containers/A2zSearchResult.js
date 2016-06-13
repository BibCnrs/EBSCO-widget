import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordList from './A2zRecordList';
import Pagination from './A2zPagination';
import SearchResult from '../components/SearchResult';

function mapStateToProps(state) {
    const searchResult = state.a2z.searchResult;
    const publications = searchResult[searchResult.currentPage];
    const first = publications && publications[0] && publications[0].id;
    const last = Array.isArray(publications) && publications.slice(-1)[0] && publications.slice(-1)[0].id;
    return {
        first,
        last,
        totalHits: searchResult.totalHits,
        maxPage: searchResult.maxPage,
        RecordList,
        Pagination
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);