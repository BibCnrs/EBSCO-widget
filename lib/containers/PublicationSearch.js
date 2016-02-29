import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Search from '../components/Search';

function mapStateToProps(state) {
    const domains = state.publication.domains;
    const { status, error, term, domain, sort } = state.publication.search;

    return {
        status,
        error,
        term,
        domains,
        domain,
        sort,
        availableSort: [
            {
                label: 'pertinence',
                value: 'relevance'
            }, {
                label: 'titre (A à Z)',
                value: 'title'
            }, {
                label: `date d'édition récente`,
                value: 'date'
            }, {
                label: `date d'édition ancienne`,
                value: 'date2'
            }
        ]
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeTerm: actions.publication.changeTerm,
        onChangeDomain: actions.publication.changeDomain,
        onSearchTerm: actions.publication.searchTerm,
        onChangeSort: actions.publication.changeSort
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
