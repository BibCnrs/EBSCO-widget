import React from 'react';

import PublicationSearch from '../containers/PublicationSearch';
import createSearchResult from '../containers/createSearchResult';
import BibSidebar from '../containers/BibSidebar';
import PublicationSearchMenu from '../containers/PublicationSearchMenu';
import PublicationLimiters from './PublicationLimiters';
import PublicationFacetList from '../containers/PublicationFacetList';

const PublicationSearchResult = createSearchResult('publication');

const Publication = () => {
    return (
        <div className="publication">
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
