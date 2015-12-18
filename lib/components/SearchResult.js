import React, { Component, PropTypes } from 'react';
import RecordList from '../containers/RecordList';
import Pagination from '../containers/Pagination';

const SearchResult = ({ maxPage }) => (
    maxPage ? (
        <div>
            <p>
                Search results : 6,001 - 6,020 of 4,066,421
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
