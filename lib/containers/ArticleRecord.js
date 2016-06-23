import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import * as fromSelectedRecord from '../reducers/selectedRecord';
import * as fromNotice from '../reducers/notice';

import ArticleRecord from '../components/ArticleRecord';

function mapStateToProps(state, ownProps) {
    const { record } = ownProps;
    return {
        record,
        noticeShown: fromNotice.isNoticeShown(state.notice, 'article', record.id),
        notice: fromNotice.getNoticeById(state.notice, 'article', record.id),
        isSelected: fromSelectedRecord.isRecordSelected(state.selectedRecord, 'article', record.id)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: (id, index) => actions.showNotice('article', id, index),
        selectRecord: actions.selectRecord
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleRecord);
