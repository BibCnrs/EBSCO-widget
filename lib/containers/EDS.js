import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import EDS from '../components/EDS';

function mapStateToProps(state) {
    const { token } = state.login;
    return {
        isLogged: !!token
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeDomain: actions.a2z.changeDomain
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EDS);
