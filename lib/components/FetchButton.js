import React, { PropTypes } from 'react';
import Button from './Button';

const FetchButton = ({ label, status, icon, disabled, onClick }) => {
    return <span className="fetch-button">
        <Button
            label={label}
            icon={ status === 'PENDING' ? {name: 'spinner', spin: true } : {name: icon} }
            disabled={disabled || status === 'PENDING'}
            onClick={onClick}
        />
    </span>;
};

FetchButton.propTypes = {
    label: PropTypes.string.isRequired,
    status: PropTypes.string,
    icon: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default FetchButton;
