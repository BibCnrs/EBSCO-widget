'use strict';

import React, { Component, PropTypes } from 'react';
import SideBar from 'react-sidebar';
import Icon from 'react-fa';
import Search from '../containers/Search';
import ResultList from '../containers/ResultList';
import Authentication from '../containers/Authentication';
import Limiters from './Limiters.js';

class App extends Component {
    constructor(props) {
        super(props);
        const { term, url, search, changeTerm, forceLogin, token } = this.props;

        if (term) {
            changeTerm(term);
        }
        if (token) {
            forceLogin(token);
            if (term) {
                search(url, term, token);
            }
        }
    }
    render() {
        const {  url, token, showLimiter, limiterShown } = this.props;
        const sideBarContent = (
            <div className="sidebar">
                <Limiters />
            </div>
        );
        return token ? (
            <div>
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
                        <Search url={url} />
                        <ResultList url={url} />
                    </div>
                </SideBar>
            </div>
        ) : (
            <Authentication url= {url} />
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired
};


export default App;
