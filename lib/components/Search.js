'use strict';

import React, { Component, PropTypes } from 'react';
import FetchButton from './FetchButton';

class Search extends Component {

    render() {
        const { status, error, term } = this.props;
        return (
            <div className="search">
                <input
                    className="input"
                    type='text'
                    value={term}
                    ref='input'
                    onChange={event => this.handleChange(event)}
                    onKeyPress={(event) => (event.key === 'Enter' && this.handleClick())}
                />
                <FetchButton
                    onClick={() => this.handleClick()}
                    status={status}
                    error={error}
                    icon="search"
                    label="Search"
                />
            </div>
        );
    }

    handleClick() {
        const { term, searchedTerm, onSearchTerm } = this.props;
        if (term !== searchedTerm) {
            onSearchTerm(term);
        }
    }

    handleChange(event) {
        this.props.onChangeTerm(event.target.value);
    }
}

Search.propTypes = {
    status: PropTypes.string.isRequired,
    error: PropTypes.string,
    term: PropTypes.string.isRequired,
    searchedTerm: PropTypes.string,
    onSearchTerm: PropTypes.func.isRequired
};

export default Search;
