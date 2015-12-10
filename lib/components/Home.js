import React, { PropTypes } from 'react';
import Icon from 'react-fa';

const Home = ({ term, searchedTerm, onChangeTerm, onSearchTerm, onOpenSearch }) => {
    return (<div className="home">
        <input className="input" type='text' value={term} onChange={e => onChangeTerm(e.target.value)} />
        <button
            className="button"
            disabled={!term}
            onClick={() => term !== searchedTerm ? onSearchTerm() : onOpenSearch(true)}
        >
            <Icon name="search"/> search
        </button>
    </div>);
};

Home.propTypes = {
    term: PropTypes.string.isRequired,
    searchedTerm: PropTypes.string,
    onChangeTerm: PropTypes.func.isRequired,
    onSearchTerm: PropTypes.func.isRequired,
    onOpenSearch: PropTypes.func.isRequired
};

export default Home;
