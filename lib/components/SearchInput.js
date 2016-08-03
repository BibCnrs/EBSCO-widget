import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';


const BibInput = ({ label, placeholder, value, buttonAfter, buttonBefore, onChange, onApply }) => {
    return (
        <Input
            className='search-input'
            type="text"
            value={value}
            hasFeedback
            label={label}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={(event) => (event.key === 'Enter' && onApply())}
            buttonAfter={buttonAfter}
            buttonBefore={buttonBefore}
        />
    );
};

BibInput.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    buttonAfter: PropTypes.object,
    buttonBefore: PropTypes.object,
    onApply: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default BibInput;
