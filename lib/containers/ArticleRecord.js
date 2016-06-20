import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import * as fromSelectedRecord from '../reducers/selectedRecord';

import ArticleRecord from '../components/ArticleRecord';

function mapStateToProps(state, ownProps) {
    const { record } = ownProps;
    return {
        record,
        isSelected: fromSelectedRecord.isSelected(state.selectedRecord, 'article', record.id)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: (id, index) => actions.showNotice('article', id, index),
        selectRecord: actions.selectRecord
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleRecord);
