import React, { PropTypes } from 'react';
import SearchResult from '../containers/SearchResult';
import Limiters from '../containers/Limiters.js';
import FacetList from '../containers/FacetList';
import Sidebar from './Sidebar';

const SearchResultWithSidebar = ({ limiterShown, showLimiter }) => {
    const sidebarContent = (
        <div>
            <Limiters />
            <hr/>
            <FacetList />
        </div>
    );
    return (
        <Sidebar
            sidebarContent={sidebarContent}
            open={showLimiter}
            isOpen={limiterShown}
        >
            <SearchResult/>
        </Sidebar>
    );
};

SearchResultWithSidebar.propTypes = {
};

export default SearchResultWithSidebar;
