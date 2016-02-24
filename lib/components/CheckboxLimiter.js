import React, { PropTypes } from 'react';
import RcCheckbox from 'rc-checkbox';

const CheckboxLimiter = ({ limiter, label, value, onApply, onChange }) => {
    return (
        <div className="checkbox-limiter">
            <label>
                <RcCheckbox
                    onChange={(e, value) => (onChange(limiter, !value), onApply())}
                    checked={value ? 1 : 0}
                /> {label}
            </label>
        </div>
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
