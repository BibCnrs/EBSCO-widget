import React, { Component, PropTypes } from 'react';
import FetchButton from './FetchButton';
import { Input, DropdownButton, MenuItem, Row, Col } from 'react-bootstrap';

class Search extends Component {
    constructor(props) {
        super(props);
        const { term, domain, domains, onSearchTerm, onChangeTerm, onChangeDomain } = this.props;

        if (domains.indexOf(domains) !== -1) {
            onChangeDomain(domain);
        }
        if (term) {
            onChangeTerm(term);
            onSearchTerm(term);
        }
    }
    render() {
        const { status, error, term, domains, domain, onChangeDomain, onChangeTerm } = this.props;

        const select = (
            <DropdownButton
                id="domain"
                name="domain"
                title={domain}
                onChange={(data) => onChangeDomain(data.value)}
            >
                {domains.map((domain, index) => (
                    <MenuItem
                        id={domain}
                        onClick={() => onChangeDomain(domain)}
                        key={index}
                        value={domain}
                    >{domain}</MenuItem>))}
            </DropdownButton>
        );

        return (
            <Row className="search">
                <Col md={10}>
                    <Input
                        type="text"
                        placeholder="Rechercher..."
                        value={term}
                        ref='input'
                        onChange={event => onChangeTerm(event.target.value)}
                        onKeyPress={(event) => (event.key === 'Enter' && this.handleClick())}
                        buttonAfter={select}
                    />
                </Col>
                <Col md={2}>
                    <FetchButton
                        disabled={!term}
                        onClick={() => this.handleClick()}
                        status={status}
                        error={error}
                        icon="search"
                        label="Rechercher"
                    />
                </Col>
            </Row>
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
