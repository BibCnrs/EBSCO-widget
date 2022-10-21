import PropTypes from 'prop-types';
import React from 'react';

export const Search = ({ SearchInput, SearchMenu }) => {
    return (
        <div className="search">
            <SearchInput />
            <div className="buttons">
                <SearchMenu />
            </div>
        </div>
    );
};

Search.propTypes = {
    SearchInput: PropTypes.func.isRequired,
    SearchMenu: PropTypes.func,
};

export default Search;
