import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../../actions';
import SearchInput from '../../components/SearchInput';
import translate from '../../higherOrderComponents/translate';
import * as fromState from '../../selectors';

function mapStateToProps(
    state,
    {
        text = {
            searchPlaceholder: 'Rechercher',
        },
    },
) {
    const term = fromState.getQueryListTerm(state);
    const status = fromState.getSearchStatus(state);
    const suggestedTerms = fromState.getQueryListSuggestedTerms(state);

    return {
        value: term,
        status,
        suggestedValues: suggestedTerms,
        placeholder: text.searchPlaceholder,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onChange: (...args) => actions.changeTerm('metadore', ...args),
            onSearch: (...args) => actions.search('metadore', ...args),
            clearAutocomplete: (...args) =>
                actions.clearAutocomplete('metadore', ...args),
        },
        dispatch,
    );
}

export default translate(
    connect(mapStateToProps, mapDispatchToProps)(SearchInput),
    'MetadoreSearchInput',
);
