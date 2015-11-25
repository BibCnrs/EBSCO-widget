'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Home from '../components/Home';

function mapStateToProps(state, ownProps) {
    const  { login, limiters, open, search } = state;
    const { term, searchedTerm } = search.toJS();
    return {
        url: ownProps.url,
        token: login.get('token'),
        limiters: limiters.toJS(),
        open,
        term,
        searchedTerm
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSearch: actions.search,
        onOpenSearch: actions.openSearch,
        onChangeTerm: actions.changeTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
