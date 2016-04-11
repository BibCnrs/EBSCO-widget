import React, { PropTypes } from 'react';

import PublicationRecordList from '../containers/PublicationRecordList';
import PublicationPagination from '../containers/PublicationPagination';
import PublicationSortSelector from '../containers/PublicationSortSelector';
import translate from '../higherOrderComponents/translate';

const PublicationSearchResult = ({ maxPage, first, last, totalHits, text }) => {
    return maxPage ? (
        <div className="search-result">
            <div>
                <span  className="search-count">{text.searchResults} : {first || 0} - {last || 0} / {totalHits}</span>
                <PublicationPagination/>
                <PublicationSortSelector/>
            </div>
            <PublicationRecordList/>
            <PublicationPagination/>
        </div>
    ) : (<div></div>);
};

PublicationSearchResult.propTypes = {
};

PublicationSearchResult.defaultProps = {
    text: {
        searchResults: 'Résultats de recherche'
    }
};

export default translate(PublicationSearchResult);
