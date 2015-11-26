'use strict';

import React, { Component, PropTypes } from 'react';
import FetchButton from './FetchButton';

class Search extends Component {

    render() {
        const { status, error, term } = this.props;
        return (
            <div className="search">
                <input className="input" type='text' value={term} ref='input' onChange={event => this.handleChange(event)} />
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
        const { term, searchedTerm } = this.props;
        if (term !== searchedTerm) {
            this.props.onSearchTerm(term);
        }
    }

    handleChange(event) {
        this.props.onChangeTerm(event.target.value);
    }
}

Search.propTypes = {
    search: PropTypes.object,
    onSearchTerm: PropTypes.func.isRequired
};

export default Search;
