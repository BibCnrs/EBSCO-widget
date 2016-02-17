import React, { PropTypes } from 'react';
import RcCheckbox from 'rc-checkbox';

const CheckboxLimiter = ({ limiter, label, value, onLimit, onChange }) => (
    <div className="checkbox-limiter">
        <label>
            <RcCheckbox
                onChange={(e, value) => (onChange(limiter, !value), onLimit())}
                checked={value ? 1 : 0}
            /> {label}
        </label>
    </div>
);

CheckboxLimiter.propTypes = {
    limiter: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onLimit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default CheckboxLimiter;
