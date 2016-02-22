import React from 'react';

import BibNavbar from '../containers/BibNavbar';
import ArticleSearch from '../containers/ArticleSearch';
import ArticleSearchMenu from '../containers/ArticleSearchMenu';
import History from '../containers/History';
import SearchResultWithSidebar from '../containers/SearchResultWithSidebar';

const EDS = () => {
    return (
        <div className="eds">
            <BibNavbar/>
            <ArticleSearch/>
            <ArticleSearchMenu/>
            <History/>
            <SearchResultWithSidebar/>
        </div>
    );
};

EDS.propTypes = {};

export default EDS;
