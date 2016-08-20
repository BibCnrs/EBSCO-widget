import React, { PropTypes } from 'react';

import PublicationSearch from '../containers/PublicationSearch';
import A2zSearch from '../containers/A2zSearch';
import BibSidebar from '../containers/BibSidebar';
import PublicationSearchMenu from '../containers/PublicationSearchMenu';
import PublicationLimiters from './PublicationLimiters';
import createFacetListContainer from '../containers/createFacetListContainer';
import createSearchResultContainer from '../containers/createSearchResultContainer';
import translate from '../higherOrderComponents/translate';

const PublicationFacetList = createFacetListContainer('publication');
const PublicationSearchResult = createSearchResultContainer('publication');

const Publication = ({text}) => {
    return (
        <div className="publication">
            <div className="search-bar">
                <PublicationSearch/>
                <PublicationSearchMenu/>
            </div>
            <A2zSearch/>
            <BibSidebar
                mainContent={<PublicationSearchResult/>}
                sidebarContent={<div>
                    <h3>{text.refine}</h3>
                    <PublicationLimiters/>
                    <hr/>
                    <PublicationFacetList/>
                </div>}
            />
        </div>
    );
};

Publication.propTypes = {
    text: PropTypes.object
};

Publication.defaultProps = {
    text: {
        refine: 'Affiner votre recherche'
    }
};

export default translate(Publication);
