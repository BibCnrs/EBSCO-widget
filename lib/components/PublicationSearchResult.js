import React, { PropTypes } from 'react';

import PublicationRecordList from '../containers/PublicationRecordList';
import PublicationPagination from '../containers/PublicationPagination';

const PublicationSearchResult = ({ maxPage, first, last, totalHits }) => (
    maxPage ? (
        <div className="search-result">
            <p>
                Résultats de recherche : {first || 0} - {last || 0} of {totalHits}
                <Pagination/>
            </p>
            <PublicationRecordList/>
            <PublicationPagination/>
        </div>
    ) : (<div></div>)
);

PublicationSearchResult.propTypes = {
};

export default PublicationSearchResult;
