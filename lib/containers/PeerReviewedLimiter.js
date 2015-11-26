import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import CheckBoxLimiter from '../components/CheckboxLimiter';

function mapStateToProps(state) {
    return {
        label: 'Relu par un comité de lecture',
        value: state.limiters.get('peerReviewed')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onLimit: actions.limitPeerReviewed
    }, dispatch, 'hello');
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxLimiter);
