import PropTypes from 'prop-types';
import React from 'react';

import BibInput from './BibInput';

const InputLimiter = ({ limiter, label, value, onChange, onApply }) => (
        <BibInput
            type="text"
            value={value}
            hasFeedback
            label={label}
            onChange={(v) => onChange(limiter, v)}
            onApply={onApply}
        />
);

InputLimiter.propTypes = {
    limiter: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onApply: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default InputLimiter;
