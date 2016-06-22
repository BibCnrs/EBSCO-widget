import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import * as fromNotice from '../reducers/notice';

import PublicationRecord from '../components/PublicationRecord';

function mapStateToProps(state, ownProps) {
    const { record, index } = ownProps;
    return {
        record,
        notice: fromNotice.getNoticeById(state.notice, 'a2z', record.id),
        noticeShown: fromNotice.isNoticeShown(state.notice, 'a2z', record.id),
        index
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: (id, index) => actions.showNotice('a2z', id, index)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationRecord);
