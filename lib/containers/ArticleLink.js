import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import ArticleLink from '../components/ArticleLink';

function mapStateToProps(state, ownProps) {
    const { index } = ownProps;
    const currentPage = state.searchResult.currentPage;
    const { articleLink, an, dbId } = state.searchResult[currentPage][index];

    return {
        index,
        link: articleLink,
        an,
        dbId,
        domain: state.search.domain,
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
