import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Authentication from '../components/Authentication';

function mapStateToProps(state) {
    const { status, token } = state.login;
    return {
        url: state.url,
        status,
        token
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSubmit: actions.apiLogin,
        goToArticle: () => actions.navigate('article')
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
