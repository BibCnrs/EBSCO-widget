import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import Search from '../components/Search';

function mapStateToProps(state) {
    const domains = state.article.domains;
    const { status, error, term, domain, sort } = state.article.search;

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
        onChangeTerm: actions.article.changeTerm,
        onChangeDomain: actions.article.changeDomain,
        onSearchTerm: actions.article.searchTerm,
        onChangeSort: actions.article.changeSort
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
