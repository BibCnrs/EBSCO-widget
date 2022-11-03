import React from 'react';

import createSearchResultContainer from '../../containers/createSearchResultContainer';
import BibSidebar from '../../containers/BibSidebar';
import translate from '../../higherOrderComponents/translate';
import SearchInput from '../../containers/Metadore/MetadoreSearchInput';
import SearchMenu from '../../containers/Metadore/MetadoreSearchMenu';
import Search from '../Search';
import MetadoreFieldSelector from './MetadoreFieldSelector';

const MetadoreSearchResult = createSearchResultContainer('metadore');

const Metadore = () => {
    return (
        <div className="metadore">
            <div className="search-bar">
                <Search
                    SearchInput={SearchInput}
                    SearchMenu={SearchMenu}
                    FieldSelector={MetadoreFieldSelector}
                />
            </div>
            <BibSidebar mainContent={<MetadoreSearchResult />} />
        </div>
    );
};

export default translate(Metadore);
