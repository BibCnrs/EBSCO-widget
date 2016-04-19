import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
            <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                <PublicationRecordList key={first}/>
            </ReactCSSTransitionGroup>
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
