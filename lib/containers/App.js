'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import ResultList from '../components/ResultList';
import actions from '../actions';

class App extends Component {
    render() {
        const { dispatch, results = [] } = this.props;
        return (
            <div>
                <Search onClick={text => dispatch(actions.search(text))} />
                <ResultList results={results} />
            </div>
        );
    }
}

App.propTypes = {
    results: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(App);
