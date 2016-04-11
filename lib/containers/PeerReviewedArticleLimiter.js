import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import CheckBoxLimiter from '../components/CheckboxLimiter';
import translate from '../higherOrderComponents/translate';

function mapStateToProps(state, { text = { peerReviewed: 'Relu par un comité de lecture' }}) {
    return {
        limiter:'peerReviewedArticle',
        label: text.peerReviewed,
        value: state.article.search.limiters.peerReviewedArticle
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onApply: actions.article.limitSearch,
        onChange: actions.article.changeLimiter
    }, dispatch);
}

export default translate(connect(mapStateToProps, mapDispatchToProps)(CheckBoxLimiter), 'PeerReviewedLimiter');
