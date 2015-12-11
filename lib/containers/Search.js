import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Search from '../components/Search';

function mapStateToProps(state) {
    const { status, error, term, searchedTerm, domains, currentDomain } = state.search.toJS();

    return {
        status,
        error,
        term,
        searchedTerm,
        domains,
        currentDomain
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeFullText: actions.changeFullText,
        onChangeTerm: actions.changeTerm,
        onChangeDomain: actions.changeDomain,
        onSearchTerm: actions.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
