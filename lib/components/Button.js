'use strict';

import React, { PropTypes } from 'react';
import Icon from 'react-fa';

const Button = ({ label, disabled, icon, onClick }) => (
    <button className="button" disabled={disabled} onClick={e => onClick(e)}>
        <Icon {...icon}/> {label}
    </button>
);

Button.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    onClick: PropTypes.object.isRequired,
    disabled: PropTypes.bool
};

export default Button;
