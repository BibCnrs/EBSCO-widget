import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import SearchInput from './PublicationSearchInput';
import Search from '../components/Search';

import * as fromQueryList from '../reducers/queryList';
import * as fromSearch from '../reducers/search';

function mapStateToProps(state) {
    const status = fromSearch.getSearchValueByName(state.search, 'publication', status);
    const term = fromQueryList.getTerm(state.queryList, 'publication');

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
