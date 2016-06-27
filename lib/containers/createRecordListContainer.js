import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordList from '../components/RecordList';
import createRecordContainer from './createRecordContainer';
import * as fromSearchResult from '../reducers/searchResult';

const createRecordListContainer = (category) => {
    function mapStateToProps(state) {
        return {
            records: fromSearchResult.getCurrentPageRecords(state.searchResult, category),
            Record: createRecordContainer(category)
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
        }, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(RecordList);
};

export default createRecordListContainer;
