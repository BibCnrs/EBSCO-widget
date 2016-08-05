import React from 'react';

import createSearchResultContainer from '../containers/createSearchResultContainer';
import A2zSearch from '../containers/A2zSearch';
import PublicationSearchMenu from '../containers/PublicationSearchMenu';
import BibSidebar from '../containers/BibSidebar';

const A2zSearchResult = createSearchResultContainer('a2z');

const A2z = () => {
    return (
        <div>
            <A2zSearch/>
            <PublicationSearchMenu/>

            <BibSidebar
                mainContent={<A2zSearchResult/>}
                sidebarContent={null}
            />
        </div>
    );
};

A2z.propTypes = {
};

A2z.defaultProps = {
};

export default A2z;
