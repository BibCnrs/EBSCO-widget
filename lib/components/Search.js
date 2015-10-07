'use strict';

import React, { findDOMNode, Component, PropTypes } from 'react';

export default class Search extends Component {
    render() {
        return (
            <div>
                <input type='text' ref='input' />
                <button onClick={e => this.handleClick(e)}>
                    Search
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
