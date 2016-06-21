import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import ArticleLink from '../components/ArticleLink';
import * as fromArticleLink from '../reducers/articleLink';

function mapStateToProps(state, ownProps) {
    const { index } = ownProps;
    const currentPage = state.article.searchResult.currentPage;
    const { id, an, dbId } = state.article.searchResult[currentPage][index] || {};

    return {
        index,
        link: fromArticleLink.getById(state.articleLink, id),
        id,
        an,
        dbId,
        domain: state.domains.article,
        url: state.url,
        token: state.login.token
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        retrieveLink: actions.retrieveLink
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleLink);
