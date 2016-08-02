import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import ArticleRecord from '../components/ArticleRecord';
import PublicationRecord from '../components/PublicationRecord';
import * as fromState from '../reducers';


const createRecordContainer = (category) => {
    const makeMapStateToProps = () => {
        const isRecordSelected = fromState.makeIsRecordSelected();
        const mapStateToProps = (state, ownProps) => {
            const { record } = ownProps;
            return {
                record,
                noticeShown: fromState.isNoticeShown(state, record.id),
                notice: fromState.getNoticeById(state, record.id),
                exporting: fromState.isExportingNotice(state, record.id),
                isSelected: isRecordSelected(state, record.id)
            };
        };

        return mapStateToProps;
    };

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({
            showNotice: (...args) => actions.showNotice(category, ...args),
            exportNotice: (...args) => actions.exportNotice(category, ...args),
            selectRecord: (...args) => actions.selectRecord(category, ...args)
        }, dispatch);
    }

    if(category === 'article') {
        return connect(makeMapStateToProps, mapDispatchToProps)(ArticleRecord);
    }
    return connect(makeMapStateToProps, mapDispatchToProps)(PublicationRecord);
};

export default createRecordContainer;
