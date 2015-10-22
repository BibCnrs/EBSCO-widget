'use strict';

import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Search from '../components/Search';
import ResultList from '../components/ResultList';
import actions from '../actions';

class App extends Component {
    render() {
        const { dispatch, results, search } = this.props;
        return (
            <div>
                <Search onClick={text => dispatch(actions.search(text))} onChange={term => dispatch(actions.changeTerm(term))} search={search.toJS()} />
                <ResultList results={results} showAbstract={(index, visibility) => dispatch(actions.showAbstract(index, visibility))} />
            </div>
        );
    }
}

App.propTypes = {
    results: ImmutablePropTypes.list.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(App);
