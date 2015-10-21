'use strict';

import React, { Component, PropTypes } from 'react';
import Icon from 'react-fa';

export default class ViewAbstract extends Component {
    render() {
        const { visibility, abstract, index } = this.props;
        return (
            <span>
                <button className="button" disabled={!abstract} onClick={e => this.handleClick(e, index, visibility)}>
                    Abstract <Icon name={visibility ? 'eye-slash' : 'eye'} />
                </button>
                {visibility ? <p>{abstract}</p> : null}
            </span>
        );
    }

    handleClick(e, index, visibility) {
        this.props.onClick(index, !visibility);
    }
}

ViewAbstract.propTypes = {
    visibility: PropTypes.bool,
    abstract: PropTypes.string,
    onClick: PropTypes.func.isRequired
};
