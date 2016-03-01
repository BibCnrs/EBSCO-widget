import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Search from '../components/Search';
import PublicationFieldSelector from './PublicationFieldSelector';

function mapStateToProps(state) {
    const domains = state.publication.domains;
    const { status, error, term, domain } = state.publication.search;

    return {
        status,
        error,
        term,
        domains,
        domain,
        fieldSelector: <PublicationFieldSelector/>
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeTerm: actions.publication.changeTerm,
        onChangeDomain: actions.publication.changeDomain,
        onSearchTerm: actions.publication.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
