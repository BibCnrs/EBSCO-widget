import PropTypes from 'prop-types';
import React from 'react';
import { Checkbox } from 'react-bootstrap';

const CheckboxLimiter = ({ limiter, label, value, onApply, onChange }) => {
    return (
        <Checkbox
            className={`checkbox-limiter ${limiter}`}
            type="checkbox"
            onChange={(event) => (onChange(limiter, !!event.target.checked), onApply())}
            checked={!!value}
        >{label}</Checkbox>
    );
};

CheckboxLimiter.propTypes = {
    limiter: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.bool,
    onApply: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CheckboxLimiter;
