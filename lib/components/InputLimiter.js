'use strict';

import React, { PropTypes } from 'react';

const InputLimiter = ({ limiter, label, value, hasChanged, onChange, onLimit }) => (
    <div className="input-limiter">
        <label>
            <h5>{label}</h5>
            <input
                type="text"
                onChange={(e) => onChange(limiter, e.target.value)}
                onBlur={() => hasChanged && onLimit()}
                checked={value ? 1 : 0}
            />
        </label>
    </div>
);

InputLimiter.propTypes = {
    onLimit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    limiter: PropTypes.string.isRequired
};

export default InputLimiter;
