import React, { PropTypes } from 'react';

const Input = ({ value, onChange, onSubmit, min, max }) => {
    const submit = (newValue) => {
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
            type="number"
            value={value}
            onChange={(event) => onChange(parseInt(event.target.value, 10))}
            onKeyPress={(event) => {
                const newValue = parseInt(event.target.value, 10);
                switch (event.key) {
                case 'Enter':
                    submit(newValue);
                    break;
                case 'Up':
                    onChange(newValue === max ? max : newValue + 1);
                    break;
                case 'Down':
                    onChange(newValue === min ? min : newValue - 1);
                    break;
                }
            }}
            onBlur={(event) => submit(parseInt(event.target.value, 10))}
        />
    );
};



Input.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default Input;
