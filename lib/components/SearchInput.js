import React, { PropTypes } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';


const SearchInput = ({ label, placeholder, value, buttonAfter, buttonBefore, onChange, onApply }) => {
    return (
        <InputGroup>
            <InputGroup.Button>{buttonBefore}</InputGroup.Button>
            <FormControl
                className='search-input'
                type="text"
                value={value}
                hasFeedback
                label={label}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                onKeyPress={(event) => (event.key === 'Enter' && onApply())}
            />
            <InputGroup.Button>{buttonAfter}</InputGroup.Button>
        </InputGroup>
    );
};

SearchInput.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    buttonAfter: PropTypes.object,
    buttonBefore: PropTypes.object,
    onApply: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SearchInput;
