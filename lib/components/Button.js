'use strict';

import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import { Button } from 'react-bootstrap';

const BibButton = ({ label = '', bsStyle = 'primary', tooltip, disabled, icon, onClick, className }) => {
    return (
        <Button bsStyle={bsStyle} className={className} title={ tooltip || label } disabled={disabled} onClick={e => onClick(e)}>
            <Icon {...icon}/> {label.charAt(0).toUpperCase() + label.slice(1)}
        </Button>
    );
};

BibButton.propTypes = {
    label: PropTypes.string,
    tooltip: PropTypes.string,
    icon: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

export default BibButton;
