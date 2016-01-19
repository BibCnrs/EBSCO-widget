import React, { PropTypes } from 'react';

const NumberInput = ({ value, onChange, onSubmit, min, max, className }) => {
    const submit = (newValue) => {
        newValue = parseInt(newValue, 10);
        if(newValue > max) {
            newValue = max;
        }
        if(newValue < min) {
            newValue = min;
        }

        onSubmit(newValue);
    };
    return (
        <input
            className={className}
            type="number"
            value={value}
            min={min}
            max={max}
            onChange={(event) => onChange(parseInt(event.target.value, 10))}
            onKeyPress={(event) => {
                if(event.key === 'Enter') {
                    submit(event.target.value);
                }
            }}
            onBlur={(event) => submit(event.target.value)}
        />
    );
};

NumberInput.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default NumberInput;
