import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Authentication from '../components/Authentication';

function mapStateToProps(state) {
    const { status, error } = state.login.toJS();
    return {
        status,
        error
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSubmit: actions.submitLogin
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
