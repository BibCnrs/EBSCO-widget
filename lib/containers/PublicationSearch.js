import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import SearchInput from './PublicationSearchInput';
import Search from '../components/Search';

import * as fromState from '../reducers';

function mapStateToProps(state) {
    const status = fromState.getSearchStatus(state);
    const term = fromState.getQueryListTerm(state);

    return {
        status,
        term,
        SearchInput
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSearchTerm: (...args) => actions.searchTerm('publication', ...args)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
