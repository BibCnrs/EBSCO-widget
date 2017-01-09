import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import Database from '../components/Database';
import * as fromState from '../selectors';

function mapStateToProps(state) {
    const language = fromState.getLanguage(state);
    if(state.databases.m) {
        console.log(state.databases.m[0][`text_${language}`]);
    }
    return {
        databases: state.databases,
        language,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Database);
