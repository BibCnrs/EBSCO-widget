'use strict';

import React, { Component, PropTypes } from 'react';
import FetchButton from './FetchButton';
import Limiters from './Limiters/index.js';

export default class Search extends Component {

    render() {
        const { onChangeFullText } = this.props;
        const { status, error, term, limiters } = this.props.search;
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
                <Limiters
                    limiters={limiters}
                    onChangeFullText={onChangeFullText}
                />
            </div>
        );
    }

    handleClick() {
        const { term, limiters } = this.props.search;
        this.props.onClick(term, limiters);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }
}

Search.propTypes = {
    search: PropTypes.object,
    onClick: PropTypes.func.isRequired
};
