'use strict';

import React, { PropTypes } from 'react';
import Icon from 'react-fa';

const Button = ({ label, tooltip, disabled, icon, onClick, className }) => {
    return (
        <button className={`button ${className}`} title={ tooltip || label } disabled={disabled} onClick={e => onClick(e)}>
            <Icon {...icon}/> {label.charAt(0).toUpperCase() + label.slice(1)}
        </button>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
    icon: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

export default Button;
