'use strict';

import React, { PropTypes } from 'react';
import Icon from 'react-fa';

const Home = ({ url, token, term, limiters, onChangeTerm, onSearch }) => {
    return (<div className="search">
        <input className="input" type='text' value={term} onChange={e => onChangeTerm(e.target.value)} />
        <button
            className="button"
            onClick={() => onSearch(url, token, term, limiters)}
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
