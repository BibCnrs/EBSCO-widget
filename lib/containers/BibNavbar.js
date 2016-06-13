import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import BibNavbar from '../components/BibNavbar';

function mapStateToProps(state) {
    const { location, fullScreen } = state.userInterface;
    const { dbUrl } = state;
    return {
        fullScreen,
        dbUrl,
        logged: !!state.login.token,
        location
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout: actions.logout,
        showLogin: actions.showLogin,
        navigate: actions.navigate,
        setFullScreen: actions.setFullScreen
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BibNavbar);
