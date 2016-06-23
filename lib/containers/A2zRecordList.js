import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordList from '../components/RecordList';
import createRecord from './createRecord';
import * as fromSearchResult from '../reducers/searchResult';

function mapStateToProps(state) {
    return {
        records: fromSearchResult.getCurrentPage(state.searchResult, 'a2z'),
        Record: createRecord('a2z')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordList);
