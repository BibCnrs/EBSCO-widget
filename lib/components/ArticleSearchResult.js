import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ArticleRecordList from '../containers/ArticleRecordList';
import ArticlePagination from '../containers/ArticlePagination';
import ArticleSortSelector from '../containers/ArticleSortSelector';
import translate from '../higherOrderComponents/translate';

export const ArticleSearchResult = ({ maxPage, first, last, totalHits, text }) => {
    return (
            maxPage ? (
                <div className="search-result">
                    <div>
                        <span className="search-count">{text.searchResults} : {first || 0} - {last || 0} / {totalHits}</span>
                        <ArticlePagination/>
                        <ArticleSortSelector/>
                    </div>
                    <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                        <ArticleRecordList key={first}/>
                    </ReactCSSTransitionGroup>
                    <ArticlePagination/>
                </div>
            ) : (
                <div key="empty"></div>
            )
    );
};

ArticleSearchResult.propTypes = {
};

ArticleSearchResult.defaultProps = {
    text: {
        searchResults: 'Résultats de recherche'
    }
};

export default translate(ArticleSearchResult);
