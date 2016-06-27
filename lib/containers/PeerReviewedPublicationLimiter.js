import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import CheckBoxLimiter from '../components/CheckboxLimiter';
import translate from '../higherOrderComponents/translate';
import * as fromLimiters from '../reducers/limiters';

function mapStateToProps(state, { text = { peerReviewed: 'Relu par un comité de lecture' }}) {
    return {
        limiter:'peerReviewed',
        label: text.peerReviewed,
        value: fromLimiters.getValueByName(state.limiters, 'publication', 'peerReviewed')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onApply: (...args) => actions.limitSearch('publication', ...args),
        onChange: (...args) => actions.changeLimiter('publication', ...args)
    }, dispatch);
}

export default translate(connect(mapStateToProps, mapDispatchToProps)(CheckBoxLimiter), 'PeerReviewedLimiter');
