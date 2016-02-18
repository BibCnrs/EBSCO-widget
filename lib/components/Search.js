import React, { Component, PropTypes } from 'react';
import FetchButton from './FetchButton';
import AutoSizeInput from 'react-input-autosize';
import Select from 'react-select';

class Search extends Component {

    render() {
        const { status, error, term, domains, domain, onChangeDomain, onChangeTerm } = this.props;
        return (
            <div className="search">
                <AutoSizeInput
                    placeholder="Rechercher..."
                    className="input"
                    value={term}
                    ref='input'
                    onChange={event => onChangeTerm(event.target.value)}
                    onKeyPress={(event) => (event.key === 'Enter' && this.handleClick())}
                />
                <Select
                    name="domain"
                    clearable={false}
                    searchable={false}
                    value={domain}
                    onChange={(data) => onChangeDomain(data.value)}
                    options={domains.map((domain) => ({ label: domain, value: domain }))}
                >
                    {domains.map((domain, index) => (<option key={index} value={domain}>{domain}</option>))}
                </Select>
                <FetchButton
                    disabled={!term}
                    onClick={() => this.handleClick()}
                    status={status}
                    error={error}
                    icon="search"
                    label="Rechercher"
                />
            </div>
        );
    }

    handleClick() {
        const { term, searchedTerm, domain, onSearchTerm } = this.props;
        if (term !== searchedTerm) {
            onSearchTerm(term, domain);
        }
    }
}

Search.propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    term: PropTypes.string.isRequired,
    domain: PropTypes.string,
    domains: PropTypes.array.isRequired,
    searchedTerm: PropTypes.string,
    onSearchTerm: PropTypes.func.isRequired,
    onChangeTerm: PropTypes.func.isRequired,
    onChangeDomain: PropTypes.func.isRequired
};

export default Search;
