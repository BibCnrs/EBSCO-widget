import React from 'react';

import ArticleSearch from '../containers/ArticleSearch';
import ArticleSearchMenu from '../containers/ArticleSearchMenu';
import History from '../containers/History';
import createSearchResultContainer from '../containers/createSearchResultContainer';
import BibSidebar from '../containers/BibSidebar';
import ArticleLimiters from './ArticleLimiters';
import createFacetListContainer from '../containers/createFacetListContainer';

const ArticleSearchResult = createSearchResultContainer('article');
const ArticleFacetList = createFacetListContainer('article');

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
