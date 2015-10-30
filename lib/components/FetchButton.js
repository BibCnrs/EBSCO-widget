'use strict';

import React, { findDOMNode, Component, PropTypes } from 'react';
import Icon from 'react-fa';

export default class Search extends Component {

    render() {
        const { label, status, error, icon, disabled, onClick } = this.props;
        return (
            <span className="fetch-button">
                <button disabled={disabled || status === 'PENDING'} onClick={e => onClick(e)}>
                    { status === 'PENDING' ? <Icon spin name="spinner"/> : <Icon name={icon}/>} {label}
                </button>
                { status === 'ERROR' ? <p className="error"><Icon name="exclamation-triangle"/> {error || 'The search failed.'}</p> : null }
            </span>
        );
    }

}

Search.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired
};
