import React, { Component, PropTypes } from 'react';
import FetchButton from './FetchButton';

class Search extends Component {

    render() {
        const { status, error, term, domains, domain, onChangeDomain, onChangeTerm } = this.props;
        return (
            <div className="search">
                <input
                    className="input"
                    type='text'
                    value={term}
                    ref='input'
                    onChange={event => onChangeTerm(event.target.value)}
                    onKeyPress={(event) => (event.key === 'Enter' && this.handleClick())}
                />
                <select
                    name="domain"
                    value={domain}
                    onChange={(event) => onChangeDomain(event.target.value)}
                >
                    {domains.map((domain, index) => (<option key={index} value={domain}>{domain}</option>))}
                </select>
                <FetchButton
                    onClick={() => this.handleClick()}
                    status={status}
                    error={error}
                    icon="search"
                    label="Search"
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
