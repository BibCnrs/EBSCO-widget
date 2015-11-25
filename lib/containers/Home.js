'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Home from '../components/Home';

function mapStateToProps(state) {
    return {
        open: state.open,
        term: state.search.get('term')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onOpenSearch: actions.openSearch,
        onChangeTerm: actions.changeTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
