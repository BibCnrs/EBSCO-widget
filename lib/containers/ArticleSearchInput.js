import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import SearchInput from '../components/SearchInput';
import ArticleFieldSelector from './ArticleFieldSelector';
import BooleanSelector from './BooleanSelector';
import translate from '../higherOrderComponents/translate';
import createDomainSelectorContainer from './createDomainSelectorContainer';
import * as fromState from '../selectors';

const ArticleDomainSelector = createDomainSelectorContainer('article');

function mapStateToProps(
    state,
    {
        index,
        text = {
            searchPlaceholder:
                'Rechercher des articles, des chapitres de livre, des DOIs, des auteurs, des mots du résumé du titre, ISSN, ISBN.',
        },
    },
) {
    const term = fromState.getQueryListTerm(state, index);
    const status = fromState.getSearchStatus(state);
    const suggestedTerms = fromState.getQueryListSuggestedTerms(state, index);

    return {
        index,
        value: term,
        status,
        suggestedValues: suggestedTerms,
        placeholder: text.searchPlaceholder,
        buttonAfter: <ArticleFieldSelector index={index} />,
        buttonBefore: index ? (
            <BooleanSelector index={index} />
        ) : (
            <ArticleDomainSelector />
        ),
        DomainSelector: ArticleDomainSelector,
    };
}

function mapDispatchToProps(dispatch, { index }) {
    return bindActionCreators(
        {
            onChange: term => actions.changeTerm('article', term, index),
            onSearch: (...args) => actions.search('article', ...args),
            clearAutocomplete: () =>
                actions.clearAutocomplete('article', index),
        },
        dispatch,
    );
}

export default translate(
    connect(mapStateToProps, mapDispatchToProps)(SearchInput),
    'ArticleSearchInput',
);
