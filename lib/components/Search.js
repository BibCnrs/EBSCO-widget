import PropTypes from 'prop-types';
import React from 'react';
import SearchDomains from './SearchDomains';

export const Search = ({ SearchInput, SearchMenu, FieldSelector }) => {
    return (
        <div className="search">
            <SearchDomains />
            <SearchInput />
            {FieldSelector && <FieldSelector />}
            <div className="buttons">
                <SearchMenu />
            </div>
        </div>
    );
};

Search.propTypes = {
    SearchInput: PropTypes.func.isRequired,
    SearchMenu: PropTypes.func,
    FieldSelector: PropTypes.func,
};

export default Search;
