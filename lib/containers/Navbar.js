import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Navbar from '../components/Navbar';

function mapStateToProps(state) {
    return {
        pathname: state.routing.location.pathname
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        logout: actions.logout
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
