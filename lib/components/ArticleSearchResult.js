import React, { Component, PropTypes } from 'react';

import ArticleRecordList from '../containers/ArticleRecordList';
import ArticlePagination from '../containers/ArticlePagination';
import ArticleSort from '../containers/ArticleSort';

const ArticleSearchResult = ({ maxPage, first, last, totalHits }) => (
    maxPage ? (
        <div className="search-result">
            <div>
                Résultats de recherche : {first || 0} - {last || 0} of {totalHits}
                <ArticlePagination/>
                <ArticleSort/>
            </div>
            <ArticleRecordList/>
            <ArticlePagination/>
        </div>
    ) : (<div></div>)
);

ArticleSearchResult.propTypes = {
};

export default ArticleSearchResult;
