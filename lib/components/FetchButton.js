'use strict';

import React, { Component, PropTypes } from 'react';
import Icon from 'react-fa';

export default class FetchButton extends Component {

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

FetchButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    status: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};
