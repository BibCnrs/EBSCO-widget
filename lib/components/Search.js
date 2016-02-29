import React, { Component, PropTypes } from 'react';
import { DropdownButton, MenuItem, Row, Col } from 'react-bootstrap';

import SearchInput from './SearchInput';
import FetchButton from './FetchButton';
import Icon from 'react-fa';

const sortTitle = {
    relevance: <span>pertinence</span>,
    date: <span>date <Icon name={'arrow-up'}/></span>,
    date2: <span>date <Icon name={'arrow-down'}/></span>,
    title: <span>titre</span>
};

class Search extends Component {
    constructor(props) {
        super(props);
        const { status, term, domain, domains, onSearchTerm, onChangeTerm, onChangeDomain } = this.props;
        if (domains.indexOf(domains) !== -1) {
            onChangeDomain(domain);
        }
        if (status === 'NONE') {
            if (term) {
                onChangeTerm(term);
                onSearchTerm(term);
            }
        }
    }
    render() {
        const { status, error, term, domains, domain, sort, availableSort, onChangeDomain, onChangeTerm, onSearchTerm, onChangeSort } = this.props;

        const selectDomain = (
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

        const selectSort = (
            <DropdownButton
                id="sort"
                name="sort"
                title={sortTitle[sort]}
                onChange={(data) => onChangeDomain(data.value)}
            >
                {availableSort.map(({value, label}, index) => (
                    <MenuItem
                        id={value}
                        onClick={() => onChangeSort(value)}
                        key={index}
                        value={value}
                    >{label}</MenuItem>))}
            </DropdownButton>);

        return (
            <Row className="search">
                <Col md={10}>
                    <SearchInput
                        type="text"
                        placeholder="Rechercher..."
                        value={term}
                        ref='input'
                        onChange={onChangeTerm}
                        onApply={() => onSearchTerm(term, domain)}
                        buttonAfter={selectDomain}
                        buttonBefore={selectSort}
                    />
                </Col>
                <Col md={2}>
                    <FetchButton
                        disabled={!term}
                        onClick={() => onSearchTerm(term, domain)}
                        status={status}
                        error={error}
                        icon="search"
                        label="Rechercher"
                    />
                </Col>
            </Row>
        );
    }
}

Search.propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    term: PropTypes.string.isRequired,
    domain: PropTypes.string,
    domains: PropTypes.array.isRequired,
    onSearchTerm: PropTypes.func.isRequired,
    onChangeTerm: PropTypes.func.isRequired,
    onChangeDomain: PropTypes.func.isRequired
};

export default Search;
