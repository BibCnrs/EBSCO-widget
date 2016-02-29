import React, { PropTypes } from 'react';
import { Input } from 'react-bootstrap';

import applyIfChange from '../containers/applyIfChange';

const BibInput = ({ label, value, onChange, onApply, buttonAfter, buttonBefore }) => (
    <Input
        type="text"
        value={value}
        hasFeedback
        label={label}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onApply()}
        onKeyPress={(event) => (event.key === 'Enter' && onApply())}
        buttonAfter={buttonAfter}
        buttonBefore={buttonBefore}
    />
);

BibInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onApply: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default applyIfChange(BibInput);
