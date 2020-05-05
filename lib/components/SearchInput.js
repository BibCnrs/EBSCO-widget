import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import Icon from 'react-fa';

export class SearchInput extends Component {
    state = {
        value: sessionStorage.getItem('searchValue'),
    };

    render() {
        const {
            label,
            placeholder,
            suggestedValues,
            buttonBefore,
            onChange,
            onSearch,
            clearAutocomplete,
            buttonAfter,
        } = this.props;

        return (
            <div className="search-input">
                <InputGroup>
                    <InputGroup.Button className="before">
                        {buttonBefore}
                    </InputGroup.Button>
                    <div className="term">
                        <FormControl
                            type="search"
                            value={this.state.value}
                            label={label}
                            placeholder={placeholder}
                            onChange={e => {
                                this.setState({ value: e.target.value });
                                onChange(e.target.value);
                            }}
                            onFocus={e => {
                                this.setState({ value: e.target.value });
                                onChange(e.target.value);
                            }}
                            onBlur={() => setTimeout(clearAutocomplete, 100)} // DIRTY: delay to be able to click on autocomplete item
                            onKeyPress={event => {
                                if (event.key === 'Enter') {
                                    sessionStorage.setItem(
                                        'searchValue',
                                        event.target.value,
                                    );
                                    onSearch(event.target.value);
                                }
                            }}
                        />
                        {suggestedValues.length ? (
                            <div className="autocompletion">
                                {['']
                                    .concat(suggestedValues)
                                    .map((val, index) => (
                                        <InputGroup.Button
                                            className="suggestion"
                                            key={index}
                                        >
                                            <Button
                                                bsStyle="link"
                                                block
                                                onMouseDown={() => {
                                                    onChange(
                                                        `${this.state.value}${val}`,
                                                    );
                                                    setTimeout(onSearch, 100);
                                                }}
                                            >
                                                <span className="suggested-term">
                                                    <strong>
                                                        {this.state.value}
                                                    </strong>
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
                    <InputGroup.Button className="after hidden">
                        {buttonAfter}
                    </InputGroup.Button>
                </InputGroup>
            </div>
        );
    }
}

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
