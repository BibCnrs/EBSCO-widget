import PropTypes from 'prop-types';
import React from 'react';
import { FormControl } from 'react-bootstrap';

import applyIfChange from '../higherOrderComponents/applyIfChange';

const BibInput = ({ label, value, onChange, onApply }) => (
    <FormControl
        type="text"
        value={value}
        hasFeedback
        label={label}
        onChange={e => onChange(e.target.value)}
        onBlur={() => onApply()}
        onKeyPress={event => event.key === 'Enter' && onApply()}
    />
);

BibInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onApply: PropTypes.func.isRequired,
};

export default applyIfChange(BibInput);
