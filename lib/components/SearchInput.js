import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import Icon from 'react-fa';

const SearchInput = ({
    label,
    placeholder,
    value,
    suggestedValues,
    buttonBefore,
    onChange,
    onSearch,
    clearAutocomplete,
    buttonAfter,
}) => {
    return (
        <div className="search-input">
            <InputGroup>
                <InputGroup.Button className="before">
                    {buttonBefore}
                </InputGroup.Button>
                <div className="term">
                    <FormControl
                        type="search"
                        value={value}
                        label={label}
                        placeholder={placeholder}
                        onChange={e => onChange(e.target.value)}
                        onFocus={e => onChange(e.target.value)}
                        onBlur={() => setTimeout(clearAutocomplete, 100)} // DIRTY: delay to be able to click on autocomplete item
                        onKeyPress={event =>
                            event.key === 'Enter' &&
                            onSearch(event.target.value)
                        }
                    />
                    {suggestedValues.length ? (
                        <div className="autocompletion">
                            {[''].concat(suggestedValues).map((val, index) => (
                                <InputGroup.Button
                                    className="suggestion"
                                    key={index}
                                >
                                    <Button
                                        bsStyle="link"
                                        block
                                        onMouseDown={() => {
                                            onChange(`${value}${val}`);
                                            setTimeout(onSearch, 100);
                                        }}
                                    >
                                        <span className="suggested-term">
                                            <strong>{value}</strong>
                                            {val}
                                        </span>
                                    </Button>
                                </InputGroup.Button>
                            ))}
                        </div>
                    ) : (
                        <span />
                    )}
                </div>
                <InputGroup.Button
                    className="search-clear"
                    onClick={() => onChange('')}
                >
                    <Icon name="times-circle" />
                </InputGroup.Button>
                <InputGroup.Button className="middle">
                    {buttonAfter}
                </InputGroup.Button>
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
    suggestedValues: [],
};

export default SearchInput;
