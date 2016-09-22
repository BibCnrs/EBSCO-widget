import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import SearchInput from './PublicationSearchInput';
import SearchMenu from './PublicationSearchMenu';
import Search from '../components/Search';

import * as fromState from '../selectors';

function mapStateToProps(state) {
    const status = fromState.getSearchStatus(state);
    const term = fromState.getQueryListTerm(state);

    return {
        status,
        term,
        SearchInput,
        SearchMenu
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onSearch: (...args) => actions.search('publication', ...args)
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
