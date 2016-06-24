import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import SearchInput from '../components/SearchInput';
import ArticleFieldSelector from './ArticleFieldSelector';
import BooleanSelector from './BooleanSelector';
import translate from '../higherOrderComponents/translate';
import createDomainSelectorContainer from './createDomainSelectorContainer';

const ArticleDomainSelector = createDomainSelectorContainer('article');

function mapStateToProps(state, { index, text = { searchPlaceholder: 'Rechercher des articles, des chapitres de livre...' } }) {
    const { queries, domain } = state.search.article;
    const { term } = queries[index || 0] || {};


    return {
        index,
        domain,
        value: term,
        placeholder: text.searchPlaceholder,
        buttonAfter: <ArticleFieldSelector index={index}/>,
        buttonBefore: index ? <BooleanSelector index={index}/> : <ArticleDomainSelector/>,
        DomainSelector: createDomainSelectorContainer('article')
    };
}

function mapDispatchToProps(dispatch, { index }) {
    return bindActionCreators({
        onChange: (term) => actions.changeQuery('article', term, 'term', index),
        onApply: (...args) => actions.searchTerm('article', ...args)
    }, dispatch);
}

export default translate(connect(mapStateToProps, mapDispatchToProps)(SearchInput), 'ArticleSearchInput');
