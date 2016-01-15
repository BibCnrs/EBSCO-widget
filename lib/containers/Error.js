import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Error from '../components/Error';

function mapStateToProps(state) {
    return {
        error: state.error
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        clearError: actions.clearError
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Error);
