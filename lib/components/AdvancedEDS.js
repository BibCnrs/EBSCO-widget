import React, { Component, PropTypes } from 'react';
import Search from '../containers/Search';
import History from '../containers/History';
import Notice from '../containers/Notice';
import BibNavbar from '../containers/BibNavbar';
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
    componentWillMount() {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }
    componentWillUnmount() {
        document.getElementsByTagName('html')[0].style.overflow = '';
    }
    render() {
        return (
            <div className="advanced-eds">
                <BibNavbar/>
                <Notice/>
                <Search/>
                <History/>
                <SearchResultWithSidebar/>
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
