import React, { PropTypes } from 'react';
import BibButton from './BibButton';

const FetchButton = ({ label, status, icon, disabled, className, bsStyle, onClick }) => {
    return <span className="fetch-button">
        <BibButton
            className={className}
            label={label}
            bsStyle={bsStyle}
            icon={ status === 'PENDING' ? {name: 'spinner', spin: true } : {name: icon} }
            disabled={disabled}
            onClick={onClick}
        />
    </span>;
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
