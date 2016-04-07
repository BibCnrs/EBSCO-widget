import React, { Component, PropTypes } from 'react';

import ArticleRecordList from '../containers/ArticleRecordList';
import ArticlePagination from '../containers/ArticlePagination';
import ArticleSortSelector from '../containers/ArticleSortSelector';
import translate from '../higherOrderComponents/translate';

export const ArticleSearchResult = ({ maxPage, first, last, totalHits, text }) => (
    maxPage ? (
        <div className="search-result">
            <div>
                <span className="search-count">{text.searchResults} : {first || 0} - {last || 0} / {totalHits}</span>
                <ArticlePagination/>
                <ArticleSortSelector/>
            </div>
            <ArticleRecordList/>
            <ArticlePagination/>
        </div>
    ) : (<div></div>)
);

ArticleSearchResult.propTypes = {
};

ArticleSearchResult.defaultProps = {
    text: {
        searchResults: 'Résultats de recherche'
    }
};

export default translate(ArticleSearchResult);
