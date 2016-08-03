import React, { PropTypes } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import Icon from 'react-fa';

const SearchInput = ({ label, placeholder, value, buttonAfter, buttonBefore, onChange, onApply }) => {
    return (
        <div className="search-input">
            <InputGroup>
                <InputGroup.Button className="before">{buttonBefore}</InputGroup.Button>
                <InputGroup className="term">
                    <FormControl
                        type="text"
                        value={value}
                        label={label}
                        placeholder={placeholder}
                        onChange={(e) => onChange(e.target.value)}
                        onKeyPress={(event) => (event.key === 'Enter' && onApply())}
                    />
                    <InputGroup.Button className="search-clear" onClick={() => onChange('')}>
                        <Icon name="times-circle" />
                    </InputGroup.Button>
                </InputGroup>
                <InputGroup.Button className="after">{buttonAfter}</InputGroup.Button>
            </InputGroup>
        </div>
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
