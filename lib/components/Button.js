'use strict';

import React, { PropTypes } from 'react';

const Button = ({ label, disabled, icon, onClick }) => (
    <button disabled={disabled} onClick={e => onClick(e)}>
        {icon} {label}
    </button>
);

Button.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Button;
