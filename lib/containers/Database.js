import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Database from '../components/Database';
import * as fromState from '../selectors';

function mapStateToProps(state) {
    return {
        databases: state.databases,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Database);
