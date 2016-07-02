import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import ArticleRecord from '../components/ArticleRecord';
import PublicationRecord from '../components/PublicationRecord';
import * as fromState from '../reducers';


const createRecordContainer = (category) => {
    function mapStateToProps(state, ownProps) {
        const { record } = ownProps;
        return {
            record,
            noticeShown: fromState.isNoticeShown(state, record.id),
            notice: fromState.getNoticeById(state, record.id),
            isSelected: fromState.isRecordSelected(state, record.id)
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            showNotice: (...args) => actions.showNotice(category, ...args),
            exportNotice: (...args) => actions.exportNotice(category, ...args),
            selectRecord: (...args) => actions.selectRecord(category, ...args)
        }, dispatch);
    }

    if(category === 'article') {
        return connect(mapStateToProps, mapDispatchToProps)(ArticleRecord);
    }
    return connect(mapStateToProps, mapDispatchToProps)(PublicationRecord);
};

export default createRecordContainer;
