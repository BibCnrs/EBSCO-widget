import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Notice from '../components/Notice';

function mapStateToProps(state) {
    const searchResult = state.articleSearchResult;
    const index = state.userInterface.notice;
    const notice = index !== null ? searchResult[searchResult.currentPage][index].notice : null;

    return {
        index,
        notice
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: actions.showNotice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
