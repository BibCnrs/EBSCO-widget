import React, { PropTypes } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import Icon from 'react-fa';

const SearchInput = ({ label, placeholder, value, suggestedValues, buttonAfter, buttonBefore, onChange, onSearch, clearAutocomplete }) => {
    return (
        <div className="search-input">
            <InputGroup>
                <InputGroup.Button className="before">{buttonBefore}</InputGroup.Button>
                <InputGroup className="term">
                    <InputGroup>
                        <FormControl
                            type="text"
                            value={value}
                            label={label}
                            placeholder={placeholder}
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={() => setTimeout(clearAutocomplete, 100)} // DIRTY: delay to be able to click on autocomplete item
                            onFocus={() => onChange(value)}
                            onKeyPress={(event) => (event.key === 'Enter' && onSearch(event.target.value))}
                        />
                        <InputGroup.Button className="search-clear" onClick={() => onChange('')}>
                            <Icon name="times-circle" />
                        </InputGroup.Button>
                        {
                            suggestedValues.length ? (
                                <InputGroup className="autocompletion">
                                    {suggestedValues.map((val, index) => (
                                        <InputGroup.Button className="suggestion" key={index}>
                                            <Button bsStyle="link" onClick={() => {
                                                onChange(`${value}${val}`);
                                                onSearch();
                                            }}>
                                                <span><strong>{value}</strong>{val}</span>
                                            </Button>
                                        </InputGroup.Button>))}
                                </InputGroup>
                            ) : <span/>
                        }
                    </InputGroup>
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
    suggestedValues: PropTypes.array,
    buttonAfter: PropTypes.object,
    buttonBefore: PropTypes.object,
    onSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    clearAutocomplete: PropTypes.func.isRequired,
};

SearchInput.defaultProps = {
    suggestedValues: []
};

export default SearchInput;
