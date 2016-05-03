import React, { PropTypes } from 'react';
import BibButton from './BibButton';

const FetchButton = ({ label, status, icon, disabled, className, onClick }) => {
    return <span className="fetch-button">
        <BibButton
            className={className}
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
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default FetchButton;
