import React, { Component, PropTypes } from 'react';
import SideBar from 'react-sidebar';
import Icon from 'react-fa';
import Modal from 'react-modal';
import Search from '../containers/Search';
import SearchResult from '../containers/SearchResult';
import History from '../containers/History';
import Limiters from '../containers/Limiters.js';
import FacetList from '../containers/FacetList';
import Loader from '../containers/Loader';
import Notice from '../containers/Notice';
import Button from './Button';

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
                <Button
                    label="Recherche simple"
                    onClick={() => push('/')}
                    icon={{name: 'compress'}}
                />
                <Limiters />
                <hr/>
                <FacetList />
            </div>
        );

        return (
            <div className="advanced-eds">
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
