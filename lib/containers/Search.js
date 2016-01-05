import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Search from '../components/Search';

function mapStateToProps(state) {
    const domains = state.domains.toJS();
    const { status, error, term, searchedTerm, domain } = state.search.toJS();

    return {
        status,
        error,
        term,
        searchedTerm,
        domains,
        domain
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
