'use strict';

import React, { Component, PropTypes } from 'react';
import FetchButton from './FetchButton';
import Limiters from './Limiters';

export default class Search extends Component {

    render() {
        const { status, error, term } = this.props.search;
        return (
            <div className="search">
                <input className="input" type='text' value={term} ref='input' onChange={e => this.handleChange(e)} />
                <FetchButton
                    onClick={(e) => this.handleClick(e)}
                    status={status}
                    error={error}
                    icon="search"
                    label="Search"
                />
                <Limiters/>
            </div>
        );
    }

    handleClick() {
        this.props.onClick(this.props.search.term);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }
}

Search.propTypes = {
    search: PropTypes.object,
    onClick: PropTypes.func.isRequired
};
