import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions';
import SearchInput from '../components/SearchInput';
import PublicationFieldSelector from './PublicationFieldSelector';
import createDomainSelectorContainer from './createDomainSelectorContainer';
import translate from '../higherOrderComponents/translate';
import * as fromState from '../reducers';

const PublicationDomainSelector = createDomainSelectorContainer('publication');

function mapStateToProps(state, { text = { searchPlaceholder: 'Rechercher des titres de revues, de livres...' } }) {
    const term = fromState.getQueryListTerm(state);
    const suggestedTerms = fromState.getQueryListSuggestedTerms(state);

    return {
        value: term,
        suggestedValues: suggestedTerms,
        placeholder: text.searchPlaceholder,
        buttonBefore: <PublicationDomainSelector/>,
        buttonAfter: <PublicationFieldSelector/>
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onChange: (...args) => actions.changeTerm('publication', ...args),
        onApply: (...args) => actions.search('publication', ...args)
    }, dispatch);
}

export default translate(connect(mapStateToProps, mapDispatchToProps)(SearchInput), 'PublicationSearchInput');
