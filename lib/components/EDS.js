import React, { Component, PropTypes } from 'react';

import Search from '../containers/Search';
import SearchResultWithSidebar from '../containers/SearchResultWithSidebar';
import History from '../containers/History';
import Notice from '../containers/Notice';
import Navbar from '../containers/Navbar';

class EDS extends Component {
    constructor(props) {
        super(props);
        const { term, domain, domains, searchTerm, changeTerm, changeDomain, token } = this.props;

        if (domains.indexOf(domains) !== -1) {
            changeDomain(domain);
        }
        if (token && term) {
            changeTerm(term);
            searchTerm(term);
        }
    }
    render() {
        return (
            <div className="eds">
                <Navbar/>
                <Notice/>
                <Search/>
                <History/>
                <SearchResultWithSidebar/>
            </div>
        );
    }
}


EDS.propTypes = {
    token: PropTypes.string,
    term: PropTypes.string,
    searchTerm: PropTypes.func.isRequired,
    changeTerm: PropTypes.func.isRequired
};


export default EDS;
