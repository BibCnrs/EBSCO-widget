import React from 'react';

import PublicationSearch from '../containers/PublicationSearch';
import BibSidebar from '../containers/BibSidebar';
import PublicationSearchMenu from '../containers/PublicationSearchMenu';
import PublicationLimiters from './PublicationLimiters';
import createFacetListContainer from '../containers/createFacetListContainer';
import createSearchResult from '../containers/createSearchResult';

const PublicationFacetList = createFacetListContainer('publication');
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
