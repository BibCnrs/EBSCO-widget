import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import PublicationRecord from '../components/PublicationRecord';
import * as fromNotice from '../reducers/notice';
import * as fromSelectedRecord from '../reducers/selectedRecord';

function mapStateToProps(state, ownProps) {
    const { record, index } = ownProps;
    return {
        record,
        noticeShown: fromNotice.isNoticeShown(state.notice, 'publication', record.id),
        notice: fromNotice.getNoticeById(state.notice, 'publication', record.id),
        isSelected: fromSelectedRecord.isRecordSelected(state.selectedRecord, 'a2z', record.id),
        index
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: (id, index) => actions.showNotice('publication', id, index),
        selectRecord: (id) => actions.selectRecord('publication', id)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationRecord);
