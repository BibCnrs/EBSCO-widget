import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import translate from '../higherOrderComponents/translate';

export const SearchResult = ({ maxPage, first, last, totalHits, text, Pagination, SortSelector, RecordList }) => {
    return (
        maxPage ? (
            <div className="search-result">
                <div>
                    <span className="search-count">{text.searchResults} : {first || 0} - {last || 0} / {totalHits}</span>
                    <Pagination/>
                    { SortSelector ? <SortSelector/> : null }
                </div>
                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    <RecordList key={first}/>
                </ReactCSSTransitionGroup>
                <Pagination/>
            </div>
        ) : (
            <div></div>
        )
    );
};

SearchResult.propTypes = {
};

SearchResult.defaultProps = {
    text: {
        searchResults: 'Résultats de recherche'
    }
};

export default translate(SearchResult);
