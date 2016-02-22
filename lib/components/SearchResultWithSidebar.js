import React, { PropTypes } from 'react';

import SearchResult from '../containers/SearchResult';
import ArticleLimiters from '../containers/ArticleLimiters';
import FacetList from '../containers/FacetList';
import Sidebar from './Sidebar';

const SearchResultWithSidebar = ({ resultShown, limiterShown, showLimiter }) => {
    const sidebarContent = (
        <div>
            <ArticleLimiters />
            <hr/>
            <FacetList />
        </div>
    );

    return resultShown ? (
        <Sidebar
            sidebarContent={sidebarContent}
            open={showLimiter}
            isOpen={limiterShown}
        >
            <SearchResult/>
        </Sidebar>
    ) : <div></div>;
};

SearchResultWithSidebar.propTypes = {
};

export default SearchResultWithSidebar;
