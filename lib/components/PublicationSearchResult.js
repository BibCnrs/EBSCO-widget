import React, { PropTypes } from 'react';

import PublicationRecordList from '../containers/PublicationRecordList';
import PublicationPagination from '../containers/PublicationPagination';
import PublicationSort from '../containers/PublicationSort';

const PublicationSearchResult = ({ maxPage, first, last, totalHits }) => {
    return maxPage ? (
        <div className="search-result">
            <div>
                Résultats de recherche : {first || 0} - {last || 0} of {totalHits}
                <PublicationPagination/>
                <PublicationSort/>
            </div>
            <PublicationRecordList/>
            <PublicationPagination/>
        </div>
    ) : (<div></div>);
};

PublicationSearchResult.propTypes = {
};

export default PublicationSearchResult;
