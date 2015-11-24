'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Authentication from '../components/Authentication';

function mapStateToProps(state, ownProps) {
    return {
        login: state.login.toJS(),
        url: ownProps.url
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSubmit: actions.login
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
