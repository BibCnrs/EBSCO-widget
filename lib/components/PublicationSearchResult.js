import React, { PropTypes } from 'react';

import PublicationRecordList from '../containers/PublicationRecordList';
import PublicationPagination from '../containers/PublicationPagination';
import PublicationSortSelector from '../containers/PublicationSortSelector';

const PublicationSearchResult = ({ maxPage, first, last, totalHits }) => {
    return maxPage ? (
        <div className="search-result">
            <div>
                Résultats de recherche : {first || 0} - {last || 0} of {totalHits}
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

export default PublicationSearchResult;
