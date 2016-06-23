import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordList from '../components/RecordList';
import Record from './PublicationRecord';
import * as fromSearchResult from '../reducers/searchResult';

function mapStateToProps(state) {
    return {
        records: fromSearchResult.getCurrentPage(state.searchResult, 'publication'),
        Record
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
