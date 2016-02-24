import React from 'react';

import BibNavbar from '../containers/BibNavbar';
import PublicationSearch from '../containers/PublicationSearch';
import PublicationSearchResult from '../containers/PublicationSearchResult';
import BibSidebar from '../containers/BibSidebar';
import PublicationSearchMenu from '../containers/PublicationSearchMenu';
import PublicationLimiters from './PublicationLimiters';
import PublicationFacetList from '../containers/PublicationFacetList';

const Publication = () => {
    return (
        <div className="publication">
            <BibNavbar/>
            <PublicationSearch/>
            <PublicationSearchMenu/>
            <BibSidebar
                mainContent={<PublicationSearchResult/>}
                sidebarContent={<div>
                    <PublicationLimiters/>
                    <hr/>
                    <PublicationFacetList/>
                </div>}
            />
        </div>
    );
};

Publication.propTypes = {};

export default Publication;
