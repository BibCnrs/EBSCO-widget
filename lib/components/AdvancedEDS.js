import React, { Component, PropTypes } from 'react';
import SideBar from 'react-sidebar';
import Icon from 'react-fa';
import Modal from 'react-modal';
import Search from '../containers/Search';
import SearchResult from '../containers/SearchResult';
import History from '../containers/History';
import Authentication from '../containers/Authentication';
import Limiters from '../containers/Limiters.js';
import FacetList from '../containers/FacetList';
import Loader from '../containers/Loader';
import Notice from '../containers/Notice';

const customStyles = {
    content : {
        top: '20px',
        left: '20px',
        right: '20px',
        bottom: '20px',
        borderRadius: '0px'
    }
};

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
        const { showLimiter, limiterShown, push } = this.props;
        const sideBarContent = (
            <div className="sidebar">
                <Limiters />
                <hr/>
                <FacetList />
            </div>
        );
        return (
            <Modal
                className="ebsco-widget"
                isOpen={true}
                onRequestClose={() => push('/')}
                style={customStyles}
            >
                <SideBar
                    sidebar={sideBarContent}
                    open={limiterShown}
                    onSetOpen={showLimiter}
                    docked={limiterShown}
                    shadow={false}
                >
                    <Loader/>
                    <div className="sidebar-handler" onClick={() => showLimiter(!limiterShown)}>
                        <Icon name={limiterShown ? 'angle-double-left' : 'angle-double-right'} size="2x"/>
                    </div>
                    <div className="main">
                        <a className="close_modal" onClick={() => push('/')}><Icon name="close"/></a>
                        <Notice/>
                        <Search/>
                        <History/>
                        <SearchResult/>
                    </div>
                </SideBar>
            </Modal>
        );
    }
}


AdvancedEDS.propTypes = {
    url: PropTypes.string.isRequired,
    token: PropTypes.string,
    limiterShown: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    term: PropTypes.string,
    showLimiter: PropTypes.func.isRequired,
    onOpenSearch: PropTypes.func.isRequired,
    searchTerm: PropTypes.func.isRequired,
    changeTerm: PropTypes.func.isRequired
};


export default AdvancedEDS;
