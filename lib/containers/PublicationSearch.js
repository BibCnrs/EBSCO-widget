import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import PublicationSearch from '../components/PublicationSearch';

function mapStateToProps(state) {
    const { status, error, queries, domain } = state.publication.search;
    const { term } = queries[0];

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
