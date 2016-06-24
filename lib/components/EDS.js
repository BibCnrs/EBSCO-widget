import React from 'react';

import ArticleSearch from '../containers/ArticleSearch';
import ArticleSearchMenu from '../containers/ArticleSearchMenu';
import History from '../containers/History';
import createSearchResult from '../containers/createSearchResult';
import BibSidebar from '../containers/BibSidebar';
import ArticleLimiters from './ArticleLimiters';
import ArticleFacetList from '../containers/ArticleFacetList';

const ArticleSearchResult = createSearchResult('article');

const EDS = () => {
    return (
        <div className="eds">
            <ArticleSearch/>
            <ArticleSearchMenu/>
            <History/>
            <BibSidebar mainContent={<ArticleSearchResult/>} sidebarContent={<div>
                <ArticleLimiters />
                <hr/>
                <ArticleFacetList />
            </div>} />
        </div>
    );
};

EDS.propTypes = {};

export default EDS;
