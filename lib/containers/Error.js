import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Error from '../components/Error';

function mapStateToProps(state) {
    const { type, code, data } = state.error;
    return {
        type: type,
        code: code,
        data: data
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        clearError: actions.clearError
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Error);
