'use strict';

import React, { PropTypes } from 'react';
import Icon from 'react-fa';

const Home = ({ url, token, term, searchedTerm, limiters, onChangeTerm, onSearch, onOpenSearch }) => {
    return (<div className="search">
        <input className="input" type='text' value={term} onChange={e => onChangeTerm(e.target.value)} />
        <button
            className="button"
            disabled={!term}
            onClick={() => term !== searchedTerm ? onSearch(url, token, term, limiters) : onOpenSearch(true)}
        >
            <Icon name="search"/> search
        </button>
    </div>);
};

Home.propTypes = {
    search: PropTypes.object,
    onSearch: PropTypes.func.isRequired
};

export default Home;
