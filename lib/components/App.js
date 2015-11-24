'use strict';

import React, { Component, PropTypes } from 'react';
import SideBar from 'react-sidebar';
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
        const {  url, token } = this.props;
        const sideBarContent = <Limiters />;
        return token ? (
            <SideBar
                sidebar={sideBarContent}
                open={false}
            >
                <div>
                    <Search url={url} />
                    <ResultList url={url} />
                </div>
            </SideBar>
        ) : (
            <Authentication url= {url} />
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired
};


export default App;
