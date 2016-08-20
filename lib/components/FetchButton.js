import React, { PropTypes } from 'react';
import BibButton from './BibButton';

const FetchButton = ({ label, status, icon, disabled, className, bsStyle, onClick }) => {
    return (
        <BibButton
            className={`fetch-button ${className}`}
            label={label}
            bsStyle={bsStyle}
            icon={ status === 'PENDING' ? {name: 'spinner', spin: true } : {name: icon} }
            disabled={disabled}
            onClick={onClick}
        />
    );
};

FetchButton.propTypes = {
    label: PropTypes.string.isRequired,
    status: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    bsStyle: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default FetchButton;
