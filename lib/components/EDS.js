import React from 'react';

import BibNavbar from '../containers/BibNavbar';
import ArticleSearch from '../containers/ArticleSearch';
import ArticleSearchMenu from '../containers/ArticleSearchMenu';
import History from '../containers/History';
import ArticleSearchResult from '../containers/ArticleSearchResult';
import BibSidebar from '../containers/BibSidebar';
import ArticleLimiters from './ArticleLimiters';
import ArticleFacetList from '../containers/ArticleFacetList';

const EDS = () => {
    return (
        <div className="eds">
            <BibNavbar/>
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
