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
import Home from '../containers/Home';
import Loader from '../containers/Loader';
import Error from '../containers/Error';
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

class App extends Component {
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
        const { token, showLimiter, limiterShown, open, onOpenSearch } = this.props;
        const sideBarContent = (
            <div className="sidebar">
                <Limiters />
                <hr/>
                <FacetList />
            </div>
        );
        return token ? (
            <div className="ebsco-widget">
                <Error/>
                <Home/>
                <Modal
                    className="ebsco-widget"
                    isOpen={open}
                    onRequestClose={() => onOpenSearch(false)}
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
                            <a className="close_modal" onClick={() => onOpenSearch(false)}><Icon name="close"/></a>
                            <Notice/>
                            <Search/>
                            <History/>
                            <SearchResult/>
                        </div>
                    </SideBar>
                </Modal>
            </div>
        ) : (
            <Authentication/>
        );
    }
}


App.propTypes = {
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


export default App;
