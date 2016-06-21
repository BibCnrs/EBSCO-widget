import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import PublicationRecord from '../components/PublicationRecord';
import * as fromNotice from '../reducers/notice';

function mapStateToProps(state, ownProps) {
    const { record, index } = ownProps;
    return {
        record,
        noticeShown: fromNotice.isShown(state.notice, 'publication', record.id),
        notice: fromNotice.getById(state.notice, 'publication', record.id),
        index
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: (id, index) => actions.showNotice('publication', id, index)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationRecord);
