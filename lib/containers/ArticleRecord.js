import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import * as fromSelectedRecord from '../reducers/selectedRecord';

import ArticleRecord from '../components/ArticleRecord';

function mapStateToProps(state, ownProps) {
    const { record, index } = ownProps;
    return {
        record,
        isSelected: fromSelectedRecord.isSelected(state.selectedRecord, 'article', record.id),
        index
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: actions.article.showNotice,
        selectRecord: actions.selectRecord
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleRecord);
