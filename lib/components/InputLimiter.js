import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';


const InputLimiter = ({ limiter, label, value, onChange, onApply }) => (
    <div className="input-limiter">
        <label>
            <Input
                type="text"
                value={value}
                hasFeedback
                label={label}
                onChange={(e) => onChange(limiter, e.target.value)}
                onBlur={() => onApply()}
                onKeyPress={(event) => (event.key === 'Enter' && onApply())}
            />
        </label>
    </div>
);

InputLimiter.propTypes = {
    limiter: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    hasChanged: PropTypes.bool.isRequired,
    onApply: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default InputLimiter;
