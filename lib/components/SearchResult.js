import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export const SearchResult = ({ maxPage, first, last, totalHits, pageSelected, selectPage, Pagination, SortSelector, RecordList, ResultsPerPageSelector }) => {
    return (
        maxPage ? (
            <div className="search-result">
                <div>
                    <input
                        type="checkbox"
                        value={pageSelected}
                        checked={pageSelected}
                        onChange={() => selectPage(first, last)}
                    />
                    <span className="search-count">
                        {first || 0} - {last || 0} / {totalHits}
                    </span>
                    <Pagination/>
                    { SortSelector ? <SortSelector/> : null }
                    <ResultsPerPageSelector/>
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
    currentPage: PropTypes.number,
    maxPage: PropTypes.number.isRequired,
    first: PropTypes.number,
    last: PropTypes.number,
    totalHits: PropTypes.number,
    pageSelected: PropTypes.bool.isRequired,
    selectPage: PropTypes.func.isRequired,
    Pagination: PropTypes.func.isRequired,
    SortSelector: PropTypes.func,
    RecordList: PropTypes.func.isRequired,
    ResultsPerPageSelector: PropTypes.func.isRequired
};

export default SearchResult;
