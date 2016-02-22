import React, { PropTypes } from 'react';

import SearchResult from '../containers/SearchResult';
import Limiters from '../containers/Limiters.js';
import FacetList from '../containers/FacetList';
import Sidebar from './Sidebar';

const SearchResultWithSidebar = ({ resultShown, limiterShown, showLimiter }) => {
    const sidebarContent = (
        <div>
            <Limiters />
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
