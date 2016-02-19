import React from 'react';

import BibNavbar from '../containers/BibNavbar';
import Search from '../containers/Search';
import SearchMenu from '../containers/SearchMenu';
import History from '../containers/History';
import SearchResultWithSidebar from '../containers/SearchResultWithSidebar';

const EDS = () => {
    return (
        <div className="eds">
            <BibNavbar/>
            <Search/>
            <SearchMenu/>
            <History/>
            <SearchResultWithSidebar/>
        </div>
    );
};

EDS.propTypes = {};

export default EDS;
