import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import ArticleLink from '../components/ArticleLink';
import * as fromArticleLink from '../reducers/articleLink';
import * as fromSearchResult from '../reducers/searchResult';

function mapStateToProps(state, ownProps) {
    const { id } = ownProps;
    const { an, dbId } = fromSearchResult.getRecordById(state.searchResult, 'article', id);

    return {
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
