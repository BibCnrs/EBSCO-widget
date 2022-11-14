import PropTypes from 'prop-types';
import React from 'react';

import A2zSearch from '../containers/A2zSearch';
import BibSidebar from '../containers/BibSidebar';
import PublicationLimiters from './PublicationLimiters';
import createFacetListContainer from '../containers/createFacetListContainer';
import createSearchResultContainer from '../containers/createSearchResultContainer';
import translate from '../higherOrderComponents/translate';
import Search from './Search';
import SearchInput from '../containers/PublicationSearchInput';
import SearchMenu from '../containers/PublicationSearchMenu';

const PublicationFacetList = createFacetListContainer('publication');
const PublicationSearchResult = createSearchResultContainer('publication');

const Publication = ({ text }) => {
    return (
        <div className="publication">
            <div className="search-bar">
                <Search SearchInput={SearchInput} SearchMenu={SearchMenu} />
            </div>
            <A2zSearch />
            <BibSidebar
                mainContent={<PublicationSearchResult />}
                sidebarContent={
                    <div>
                        <h3>{text.refine}</h3>
                        <PublicationLimiters />
                        <hr />
                        <PublicationFacetList />
                    </div>
                }
            />
        </div>
    );
};

Publication.propTypes = {
    text: PropTypes.object,
};

Publication.defaultProps = {
    text: {
        refine: 'Affiner votre recherche',
    },
};

export default translate(Publication);
