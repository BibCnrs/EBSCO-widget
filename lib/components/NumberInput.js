import React, { PropTypes } from 'react';

const Input = ({ value, onChange, onSubmit }) => {
    return (
        <input
            type="number"
            value={value}
            onChange={(event) => onChange(parseInt(event.target.value, 10))}
            onKeyPress={(event) => {
                const newValue = parseInt(event.target.value, 10);
                switch (event.key) {
                case 'Enter':
                    onSubmit(newValue);
                    break;
                case 'Up':
                    onChange(newValue + 1);
                    break;
                case 'Down':
                    onChange(newValue - 1);
                    break;
                }
            }}
            onBlur={(event) => {
                onChange(parseInt(event.target.value, 10));
            }}
        />
    );
};



Input.propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default Input;
