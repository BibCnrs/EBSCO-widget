import React, { Component, PropTypes } from 'react';
import Search from '../containers/Search';
import History from '../containers/History';
import Notice from '../containers/Notice';
import Navbar from '../containers/Navbar';
import SearchResultWithSidebar from '../containers/SearchResultWithSidebar';

class AdvancedEDS extends Component {
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
                <div className="advanced-eds">
                    <div className="main">
                        <Navbar/>
                        <Notice/>
                        <Search/>
                        <History/>
                        <SearchResultWithSidebar/>
                    </div>
                </div>
        );
    }
}


AdvancedEDS.propTypes = {
    url: PropTypes.string.isRequired,
    token: PropTypes.string,
    limiterShown: PropTypes.bool.isRequired,
    term: PropTypes.string,
    showLimiter: PropTypes.func.isRequired,
    searchTerm: PropTypes.func.isRequired,
    changeTerm: PropTypes.func.isRequired
};


export default AdvancedEDS;
