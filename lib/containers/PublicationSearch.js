import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import PublicationSearch from '../components/PublicationSearch';

function mapStateToProps(state) {
    const { status, error, term, domain } = state.publication.search;

    return {
        status,
        error,
        term,
        domain
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSearchTerm: actions.publication.searchTerm
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicationSearch);
