import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import Button from './Button';

const FetchButton = ({ label, status, error, icon, disabled, onClick }) => (
    <span className="fetch-button">
        <Button
            label={label}
            icon={ status === 'PENDING' ? {name: 'spinner', spin: true } : {name: icon} }
            disabled={disabled || status === 'PENDING'}
            onClick={onClick}
        />
        { status === 'ERROR' ? <p className="error"><Icon name="exclamation-triangle"/> {error || 'The search failed.'}</p> : null }
    </span>
);

FetchButton.propTypes = {
    label: PropTypes.string.isRequired,
    status: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default FetchButton;
