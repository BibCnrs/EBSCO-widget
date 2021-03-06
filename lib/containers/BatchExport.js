import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import BatchExport from '../components/BatchExport';
import { exportTypes } from '../config/article';

import * as fromState from '../selectors';

function mapStateToProps(state) {
    return {
        selectedIds: fromState.getSelectedRecordIds(state),
        exportTypes,
        exporting: fromState.isExporting(state),
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            exportNotice: (...args) => actions.exportNotice('article', ...args),
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(BatchExport);
