import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import CheckBoxLimiter from '../components/CheckboxLimiter';
import translate from '../higherOrderComponents/translate';

function mapStateToProps(state, { text = { peerReviewed: 'Relu par un comité de lecture' }}) {
    return {
        limiter:'peerReviewedPublication',
        label: text.peerReviewed,
        value: state.publication.search.limiters.peerReviewedPublication
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onApply: actions.publication.limitSearch,
        onChange: actions.publication.changeLimiter
    }, dispatch);
}

export default translate(connect(mapStateToProps, mapDispatchToProps)(CheckBoxLimiter), 'PeerReviewedLimiter');
