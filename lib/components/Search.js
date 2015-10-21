'use strict';

import React, { findDOMNode, Component, PropTypes } from 'react';
import Icon from 'react-fa';

export default class Search extends Component {
    render() {
        const state = this.props.state;
        return (
            <div>
                <input type='text' ref='input' />
                <button className="search_button" disabled={state === 'PENDING'} onClick={e => this.handleClick(e)}>
                    { state === 'PENDING' ? <Icon spin name="spinner"/> : null} Search
                </button>
            </div>
        );
    }

    handleClick() {
        const node = findDOMNode(this.refs.input);
        const text = node.value.trim();
        this.props.onClick(text);
        node.value = '';
    }
}

Search.propTypes = {
    onClick: PropTypes.func.isRequired
};
