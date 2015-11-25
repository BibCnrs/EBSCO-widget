'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Home from '../components/Home';

function mapStateToProps(state, ownProps) {
    return {
        url: ownProps.url,
        token: state.login.get('token'),
        limiters: state.limiters.toJS(),
        open: state.open,
        term: state.search.get('term')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSearch: actions.search,
        onChangeTerm: actions.changeTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
