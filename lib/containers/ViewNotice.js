import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import ViewNotice from '../components/ViewNotice';

function mapStateToProps(state, ownProps) {
    const { index, url }  = ownProps;
    const { dbId, an, notice } = state.results.get(index).toJS();
    const { status, error, shown, data } = notice;

    return {
        index,
        dbId,
        an,
        status,
        error,
        data,
        shown,
        url,
        token: state.login.get('token')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onShowNotice: actions.showNotice,
        onFetchNotice: actions.fetchNotice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewNotice);
