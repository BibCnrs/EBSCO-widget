import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import ArticleNotice from '../components/ArticleNotice';

function mapStateToProps(state) {
    const searchResult = state.article.searchResult;
    const index = state.userInterface.notice;
    const notice = index !== null ? searchResult[searchResult.currentPage][index].notice : null;

    return {
        index,
        notice
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: actions.article.showNotice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleNotice);
