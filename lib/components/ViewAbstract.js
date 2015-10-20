'use strict';

import React, { findDOMNode, Component, PropTypes } from 'react';

export default class ViewAbstract extends Component {
    render() {
        const visibility = this.props.value;
        return (
            <button className="button" onClick={e => this.handleClick(e)}>
                {visibility ? 'Hide Abstract' : 'View Abstract' }
            </button>
        );
    }

    handleClick() {
        this.props.onClick();
    }
}

ViewAbstract.propTypes = {
    onClick: PropTypes.func.isRequired
};
