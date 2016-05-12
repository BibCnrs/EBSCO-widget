import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Authentication from '../components/Authentication';

function mapStateToProps(state) {
    const { status, token } = state.login;
    const { showLogin } = state.userInterface;
    return {
        url: state.url,
        status,
        token,
        showLogin
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSubmit: actions.apiLogin,
        goToArticle: () => actions.navigate('article'),
        hideLogin: () => actions.hideLogin()
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
