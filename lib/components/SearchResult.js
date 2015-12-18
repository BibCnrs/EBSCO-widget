import React, { Component, PropTypes } from 'react';
import RecordList from '../containers/RecordList';
import Pagination from '../containers/Pagination';

const SearchResult = ({ maxPage, first, last, totalHits }) => (
    maxPage ? (
        <div>
            <p>
                Search results : {first} - {last} of {totalHits}
                <Pagination/>
            </p>
            <RecordList/>
            <Pagination/>
        </div>
    ) : (<div></div>)
);

SearchResult.propTypes = {
};

export default SearchResult;
