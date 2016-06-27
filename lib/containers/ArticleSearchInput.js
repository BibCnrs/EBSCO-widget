import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

import SearchInput from '../components/SearchInput';
import ArticleFieldSelector from './ArticleFieldSelector';
import BooleanSelector from './BooleanSelector';
import translate from '../higherOrderComponents/translate';
import createDomainSelectorContainer from './createDomainSelectorContainer';

import * as fromQueryList from '../reducers/queryList';

const ArticleDomainSelector = createDomainSelectorContainer('article');

function mapStateToProps(state, { index, text = { searchPlaceholder: 'Rechercher des articles, des chapitres de livre...' } }) {
    const term = fromQueryList.getTerm(state.queryList, 'article', index);


    return {
        index,
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
