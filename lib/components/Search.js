'use strict';

import React, { findDOMNode, Component, PropTypes } from 'react';
import FetchButton from './FetchButton';

export default class Search extends Component {

    render() {
        const { status, error, term } = this.props.search;
        return (
            <div className="search">
                <input type='text' value={term} ref='input' onChange={e => this.handleChange(e)} />
                <FetchButton
                    onClick={(e) => this.handleClick(e)}
                    status={status}
                    error={error}
                    icon="search"
                    label="Search"
                />
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
    onClick: PropTypes.func.isRequired
};
