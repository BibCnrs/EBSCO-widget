import PropTypes from 'prop-types';
import React from 'react';

import FetchButton from './FetchButton';
import translate from '../higherOrderComponents/translate';

export const Search = ({ status, term, text, onSearch, SearchInput }) => {
    return (
        <div className="search">
            <SearchInput />
            <div>
                <FetchButton
                    className="search-button"
                    disabled={!term}
                    onClick={() => onSearch()}
                    status={status}
                    icon="search"
                    label={text.search}
                />
                {/* <SearchMenu /> */}
            </div>
        </div>
    );
};

Search.propTypes = {
    status: PropTypes.string,
    term: PropTypes.string,
    text: PropTypes.object,
    onSearch: PropTypes.func.isRequired,
    SearchInput: PropTypes.func.isRequired,
    SearchMenu: PropTypes.func.isRequired,
};

Search.defaultProps = {
    text: {
        search: 'Rechercher',
    },
};

export default translate(Search, 'Search');
