import PropTypes from 'prop-types';
import React from 'react';

export const Search = ({ SearchInput, SearchMenu, FieldSelector }) => {
    return (
        <div className="search">
            <SearchInput />
            <div className="buttons">
                <SearchMenu />
            </div>
            {FieldSelector && <FieldSelector />}
        </div>
    );
};

Search.propTypes = {
    SearchInput: PropTypes.func.isRequired,
    SearchMenu: PropTypes.func,
    FieldSelector: PropTypes.func,
};

export default Search;
