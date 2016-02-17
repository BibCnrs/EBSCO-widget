import React, { Component, PropTypes } from 'react';

import Search from '../containers/Search';
import SearchResultWithSidebar from '../containers/SearchResultWithSidebar';
import History from '../containers/History';
import Loader from '../containers/Loader';
import Notice from '../containers/Notice';
import Logout from '../containers/Logout';
import Button from './Button';

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
        const { push  } = this.props;
        return (
            <div className="eds">
                <Loader/>
                <div className="main">
                    <Button
                        className="expand"
                        label=''
                        icon={{name: 'expand'}}
                        onClick={() => push('/advancedEDS')}
                    />
                    <Notice/>
                    <Search/>
                    <Logout />
                    <History/>
                    <SearchResultWithSidebar/>
                </div>
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
