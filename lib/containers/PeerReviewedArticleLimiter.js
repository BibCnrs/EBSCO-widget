import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import CheckBoxLimiter from '../components/CheckboxLimiter';

function mapStateToProps(state) {
    return {
        limiter:'peerReviewedArticle',
        label: 'Relu par un comité de lecture',
        value: state.article.search.limiters.peerReviewedArticle
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onApply: actions.article.limitSearch,
        onChange: actions.article.changeLimiter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxLimiter);
