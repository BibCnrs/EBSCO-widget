import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import * as fromNotice from '../reducers/notice';
import * as fromSelectedRecord from '../reducers/selectedRecord';
import ArticleRecord from '../components/ArticleRecord';
import PublicationRecord from '../components/PublicationRecord';


const createRecordContainer = (category) => {
    function mapStateToProps(state, ownProps) {
        const { record } = ownProps;
        return {
            record,
            noticeShown: fromNotice.isNoticeShown(state.notice, category, record.id),
            notice: fromNotice.getNoticeById(state.notice, category, record.id),
            isSelected: fromSelectedRecord.isRecordSelected(state.selectedRecord, category, record.id)
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            showNotice: (...args) => actions.showNotice(category, ...args),
            selectRecord: (...args) => actions.selectRecord(category, ...args)
        }, dispatch);
    }

    if(category === 'article') {
        return connect(mapStateToProps, mapDispatchToProps)(ArticleRecord);
    }
    return connect(mapStateToProps, mapDispatchToProps)(PublicationRecord);
};

export default createRecordContainer;
