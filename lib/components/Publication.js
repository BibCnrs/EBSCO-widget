import React from 'react';

import BibNavbar from '../containers/BibNavbar';
import PublicationSearch from '../containers/PublicationSearch';
import PublicationSearchResult from '../containers/PublicationSearchResult';
import BibSidebar from '../containers/BibSidebar';
import PublicationSearchMenu from '../containers/PublicationSearchMenu';
import PublicationLimiters from '../containers/PublicationLimiters';
import PublicationFacetList from '../containers/PublicationFacetList';
import PublicationNotice from '../containers/PublicationNotice';

const Publication = () => {
    return (
        <div className="publication">
            <PublicationNotice/>
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
