import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import ArticleLink from '../components/ArticleLink';
import * as fromState from '../selectors';

function mapStateToProps(state, ownProps) {
    const { id } = ownProps;
    const { an, dbId } = fromState.getRecordById(state, id);

    return {
        link: fromState.getArticleLinkById(state, id),
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
