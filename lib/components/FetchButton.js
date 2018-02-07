import PropTypes from 'prop-types';
import React from 'react';
import BibButton from './BibButton';

const FetchButton = ({ label, status, icon, disabled, className, bsStyle, block, onClick }) => {
    return (
        <BibButton
            className={`fetch-button ${className}`}
            label={label}
            bsStyle={bsStyle}
            block={block}
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
    block: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default FetchButton;
