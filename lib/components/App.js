'use strict';

import React, { Component, PropTypes } from 'react';
import SideBar from 'react-sidebar';
import Icon from 'react-fa';
import Modal from 'react-modal';
import Search from '../containers/Search';
import ResultList from '../containers/ResultList';
import Authentication from '../containers/Authentication';
import Limiters from './Limiters.js';
import Home from '../containers/Home';

const customStyles = {
    content : {
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        borderRadius: '0px'
    }
};


class App extends Component {
    constructor(props) {
        super(props);
        const { term, url, search, changeTerm, forceLogin, token, limiters } = this.props;

        if (term) {
            changeTerm(term);
        }
        if (token) {
            forceLogin(token);
            if (term) {
                search(url, token, term, limiters);
            }
        }
    }
    render() {
        const {  url, token, showLimiter, limiterShown, open, onOpenSearch } = this.props;
        const sideBarContent = (
            <div className="sidebar">
                <Limiters />
            </div>
        );
        return token ? (
            <div>
                <Home/>
                <Modal
                    isOpen={open}
                    onRequestClose={() => onOpenSearch(false)}
                    style={customStyles}
                >
                    <div className="hidden-sidebar" onClick={() => showLimiter(!limiterShown)}>
                        <Icon name={limiterShown ? 'angle-double-left' : 'angle-double-right'} size="2x"/>
                    </div>
                    <SideBar
                        sidebar={sideBarContent}
                        open={limiterShown}
                        onSetOpen={showLimiter}
                        docked={limiterShown}
                    >
                        <div className="main">
                            <a className="close_modal" onClick={() => onOpenSearch(false)}><Icon name="close"/></a>
                            <Search url={url} />
                            <ResultList url={url} />
                        </div>
                    </SideBar>
                </Modal>
            </div>
        ) : (
            <Authentication url= {url} />
        );
    }
}

App.propTypes = {
};


export default App;
