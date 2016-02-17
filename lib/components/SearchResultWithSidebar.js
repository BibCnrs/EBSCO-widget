import React, { PropTypes } from 'react';
import SearchResult from '../containers/SearchResult';
import Limiters from '../containers/Limiters.js';
import Icon from 'react-fa';
import FacetList from '../containers/FacetList';

const SearchResultWithSidebar = ({ limiterShown, showLimiter }) => {

    return (
        <div className={`search-result-with-sidebar ${limiterShown ? 'with-sidebar' : 'no-sidebar'}`}>
            <div
                className="sidebar-handler"
                onClick={() => showLimiter(!limiterShown)}
            >
                <Icon name={limiterShown ? 'angle-double-left' : 'angle-double-right'} size="2x"/>
            </div>
            { limiterShown ? <div className="sidebar">
                <Limiters />
                <hr/>
                <FacetList />
            </div> : null}
            <SearchResult/>
        </div>
    );
};

SearchResultWithSidebar.propTypes = {
};

export default SearchResultWithSidebar;
