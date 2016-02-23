import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import CheckBoxLimiter from '../components/CheckboxLimiter';

function mapStateToProps(state) {
    return {
        limiter:'peerReviewed',
        label: 'Relu par un comité de lecture',
        value: state.articleSearch.limiters.peerReviewed
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onLimit: actions.limitSearch,
        onChange: actions.changeLimiter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxLimiter);
