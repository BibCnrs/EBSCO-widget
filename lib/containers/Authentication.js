import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import actions from '../actions';
import Authentication from '../components/Authentication';

function mapStateToProps(state, ownProps) {
    const { status, token } = state.login;
    return {
        next: ownProps.location.query.next,
        status,
        token
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSubmit: actions.submitLogin,
        push: routeActions.push
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
