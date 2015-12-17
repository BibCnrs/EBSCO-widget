import React, { Component, PropTypes } from 'react';
import RecordList from '../containers/RecordList';
import Pagination from '../containers/Pagination';

const SearchResult = ({ maxPage }) => (
    maxPage ? (
        <div>
            <RecordList/>
            <Pagination/>
        </div>
    ) : (<div></div>)
);

SearchResult.propTypes = {
};

export default SearchResult;
