import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordList from '../components/RecordList';
import createRecord from './createRecord';
import * as fromSearchResult from '../reducers/searchResult';

const createRecordListContainer = (category) => {
    function mapStateToProps(state) {
        return {
            records: fromSearchResult.getCurrentPage(state.searchResult, category),
            Record: createRecord(category)
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
        }, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(RecordList);
};

export default createRecordListContainer;
