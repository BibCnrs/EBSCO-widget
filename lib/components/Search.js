'use strict';

import React, { findDOMNode, Component, PropTypes } from 'react';
import Icon from 'react-fa';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    render() {
        const search = this.props.search;
        return (
            <div className="search">
                <input type='text' value={this.state.term} ref='input' onChange={e => this.handleChange(e)} />
                <button className="search_button" disabled={search.status === 'PENDING'} onClick={e => this.handleClick(e)}>
                    { search.status === 'PENDING' ? <Icon spin name="spinner"/> : <Icon name="search"/>} Search
                </button>
                { search.status === 'ERROR' ? <p className="error"><Icon name="exclamation-triangle"/> {search.error || 'The search failed.'}</p> : null }
            </div>
        );
    }

    handleClick() {
        this.props.onClick(this.state.term);
        this.setState({ term: '' });
    }

    handleChange(event) {
        this.setState({ term: event.target.value });
    }
}

Search.propTypes = {
    onClick: PropTypes.func.isRequired
};
