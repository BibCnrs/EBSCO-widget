import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import ArticleRecord from '../components/ArticleRecord';

function mapStateToProps(state, ownProps) {
    const { article, index } = ownProps;
    return {
        article,
        index
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotice: actions.article.showNotice
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleRecord);
