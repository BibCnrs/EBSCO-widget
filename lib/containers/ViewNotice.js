import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import ViewNotice from '../components/ViewNotice';

function mapStateToProps(state, ownProps) {
    const { index }  = ownProps;
    const searchResult = state.searchResult;
    const { notice } = searchResult.get(searchResult.get('currentPage')).get(index).toJS();
    const { status, error, shown, data } = notice;

    return {
        index,
        status,
        error,
        data,
        shown
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onShowNotice: actions.showNotice,
        onFetchNotice: actions.fetchNotice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewNotice);
