import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';

const CheckboxLimiter = ({ limiter, label, value, onApply, onChange }) => {
    return (
        <Input
            className={`checkbox-limiter ${limiter}`}
            type="checkbox"
            label={label}
            onChange={(event) => (onChange(limiter, !!event.target.checked), onApply())}
            checked={!!value}
        />
    );
};

CheckboxLimiter.propTypes = {
    limiter: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onApply: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CheckboxLimiter;
