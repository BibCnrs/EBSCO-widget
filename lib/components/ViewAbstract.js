'use strict';

import React, { findDOMNode, Component, PropTypes } from 'react';
import Icon from 'react-fa';

export default class ViewAbstract extends Component {
    render() {
        const visibility = this.props.value;
        return (
            <div>
                <button className="button" onClick={e => this.handleClick(e)}>
                    Abstract
                    <Icon name={visibility ? 'eye' : 'eye-slash'} />
                </button>
                {visibility ? <p>{this.props.abstract}</p> : null}
            </div>
        );
    }

    handleClick() {
        this.props.onClick();
    }
}

ViewAbstract.propTypes = {
    onClick: PropTypes.func.isRequired
};
