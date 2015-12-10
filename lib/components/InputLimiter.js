import React, { PropTypes } from 'react';

const InputLimiter = ({ limiter, label, value, hasChanged, onChange, onLimit }) => (
    <div className="input-limiter">
        <label>
            <h5>{label}</h5>
            <input
                type="text"
                onChange={(e) => onChange(limiter, e.target.value)}
                onBlur={() => hasChanged && onLimit()}
                onKeyPress={(event) => (event.key === 'Enter' && onLimit())}
                value={value}
            />
        </label>
    </div>
);

InputLimiter.propTypes = {
    limiter: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    hasChanged: PropTypes.bool.isRequired,
    onLimit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default InputLimiter;
