import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import SearchInput from './PublicationSearchInput';
import Search from '../components/Search';

function mapStateToProps(state) {
    const { status, error, term, domain } = state.search.publication;

    return {
        status,
        error,
        term,
        domain,
        SearchInput
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSearchTerm: (...args) => actions.searchTerm('publication', ...args)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
