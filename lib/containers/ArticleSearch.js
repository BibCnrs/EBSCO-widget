import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Search from '../components/Search';

function mapStateToProps(state) {
    const domains = state.article.domains;
    const { status, error, term, defaultTerm, domain } = state.article.search;

    return {
        status,
        error,
        term,
        defaultTerm,
        domains,
        domain
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeTerm: actions.article.changeTerm,
        onChangeDomain: actions.article.changeDomain,
        onSearchTerm: actions.article.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
