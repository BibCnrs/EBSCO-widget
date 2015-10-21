'use strict';

import React, { findDOMNode, Component, PropTypes } from 'react';
import Icon from 'react-fa';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    render() {
        const state = this.props.state;
        return (
            <div>
                <input type='text' value={this.state.term} ref='input' onChange={e => this.handleChange(e)} />
                <button className="search_button" disabled={state === 'PENDING'} onClick={e => this.handleClick(e)}>
                    { state === 'PENDING' ? <Icon spin name="spinner"/> : null} Search
                </button>
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
