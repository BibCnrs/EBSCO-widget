import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchResult from '../components/SearchResult';

function mapStateToProps(state) {
    const searchResult = state.searchResult;
    const records = searchResult.get(searchResult.get('currentPage'));
    const first = records.first() && records.first().get('id');
    const last = records.last() && records.last().get('id');
    return {
        first,
        last,
        totalHits: searchResult.get('totalHits'),
        maxPage: searchResult.get('maxPage')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
