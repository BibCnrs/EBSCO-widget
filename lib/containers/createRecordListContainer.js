import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecordList from '../components/RecordList';
import createRecordContainer from './createRecordContainer';
import * as fromState from '../selectors';

const recordContainers = {
    article: createRecordContainer('article'),
    publication: createRecordContainer('publication'),
};

const createRecordListContainer = category => {
    function mapStateToProps(state) {
        return {
            records: fromState.getCurrentPageRecords(state),
            Record: recordContainers[category],
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({}, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(RecordList);
};

export default createRecordListContainer;
