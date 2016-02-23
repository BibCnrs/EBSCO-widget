import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import CheckBoxLimiter from '../components/CheckboxLimiter';

function mapStateToProps(state) {
    return {
        limiter:'peerReviewed',
        label: 'Relu par un comité de lecture',
        value: state.publication.search.limiters.peerReviewed
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onLimit: actions.publication.limitSearch,
        onChange: actions.publication.changeLimiter
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxLimiter);
