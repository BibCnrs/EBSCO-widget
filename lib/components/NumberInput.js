import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';

import applyIfChange from '../higherOrderComponents/applyIfChange';

const NumberInput = ({ value, onChange, onApply, min, max, className }) => {
    const submit = (newValue) => {
        newValue = parseInt(newValue, 10);
        if(newValue > max) {
            newValue = max;
        }
        if(newValue < min) {
            newValue = min;
        }

        onApply(newValue);
    };
    return (
        <Input
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
    onApply: PropTypes.func.isRequired
};

export default applyIfChange(NumberInput);
