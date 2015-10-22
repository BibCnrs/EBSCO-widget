'use strict';

import React, { findDOMNode, Component, PropTypes } from 'react';
import Icon from 'react-fa';

export default class Search extends Component {

    render() {
        const { term, status, error } = this.props.search;
        return (
            <div className="search">
                <input type='text' value={term} ref='input' onChange={e => this.handleChange(e)} />
                <button className="search_button" disabled={!term || status === 'PENDING'} onClick={e => this.handleClick(e)}>
                    { status === 'PENDING' ? <Icon spin name="spinner"/> : <Icon name="search"/>} Search
                </button>
                { status === 'ERROR' ? <p className="error"><Icon name="exclamation-triangle"/> {error || 'The search failed.'}</p> : null }
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
