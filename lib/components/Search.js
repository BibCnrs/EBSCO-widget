import React, { PropTypes } from 'react';

import FetchButton from './FetchButton';
import translate from '../higherOrderComponents/translate';

export const Search = ({ status, term, domain, text, onSearch, SearchInput, SearchMenu }) => {
    return (
        <div className="search">
            <SearchInput/>
            <div>
            <FetchButton
                className="search-button"
                disabled={!term || !domain}
                onClick={() => onSearch()}
                status={status}
                icon="search"
                label={text.search}
            />
            <SearchMenu/>
            </div>
        </div>
    );
};

Search.propTypes = {
    status: PropTypes.string,
    term: PropTypes.string,
    domain: PropTypes.string,
    text: PropTypes.object,
    onSearch: PropTypes.func.isRequired,
    SearchInput: PropTypes.func.isRequired,
    SearchMenu: PropTypes.func.isRequired
};

Search.defaultProps = {
    text: {
        search: 'Rechercher'
    }
};

export default translate(Search, 'Search');
