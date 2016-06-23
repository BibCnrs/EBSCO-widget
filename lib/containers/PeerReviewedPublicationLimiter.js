import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import CheckBoxLimiter from '../components/CheckboxLimiter';
import translate from '../higherOrderComponents/translate';
import * as fromLimiters from '../reducers/limiters';

function mapStateToProps(state, { text = { peerReviewed: 'Relu par un comité de lecture' }}) {
    return {
        limiter:'peerReviewedPublication',
        label: text.peerReviewed,
        value: fromLimiters.getValue(state.limiters, 'publication', 'peerReviewed')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onApply: actions.publication.limitSearch,
        onChange: actions.publication.changeLimiter
    }, dispatch);
}

export default translate(connect(mapStateToProps, mapDispatchToProps)(CheckBoxLimiter), 'PeerReviewedLimiter');
