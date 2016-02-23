import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Search from '../components/Search';

function mapStateToProps(state) {
    const domains = state.domains;
    const { status, error, term, defaultTerm, searchedTerm, domain } = state.articleSearch;

    return {
        status,
        error,
        term,
        defaultTerm,
        searchedTerm,
        domains,
        domain
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeTerm: actions.changeArticleTerm,
        onChangeDomain: actions.changeDomain,
        onSearchTerm: actions.searchArticleTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
