import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchResult from '../components/SearchResult';

function mapStateToProps(state) {
    const searchResult = state.searchResult;
    const records = searchResult.get(searchResult.get('currentPage'));
    return {
        first: records.first().get('id'),
        last: records.last().get('id'),
        totalHits: searchResult.get('totalHits'),
        maxPage: searchResult.get('maxPage')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
