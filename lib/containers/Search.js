import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Search from '../components/Search';

function mapStateToProps(state) {
    const { status, error, term, searchedTerm } = state.search.toJS();

    return {
        status,
        error,
        term,
        searchedTerm,
        limiters: state.limiters.toJS(),
        url: state.url,
        token: state.login.get('token')
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeFullText: actions.changeFullText,
        onChangeTerm: actions.changeTerm,
        onSearch: actions.search
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
