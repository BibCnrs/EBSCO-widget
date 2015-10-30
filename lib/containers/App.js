'use strict';

import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Search from '../components/Search';
import ResultList from '../components/ResultList';
import Authentication from './Authentication';
import actions from '../actions';

class App extends Component {
    render() {
        const { dispatch, results, search, url, term, login } = this.props;
        const token = login.get('token');
        if (search.get('status') === 'NONE' && term) {
            dispatch(actions.changeTerm(term));
            dispatch(actions.search(url, term));
        }
        return (
            <div>
                {token ?
                    <span>
                        <Search onClick={text => dispatch(actions.search(url, text, token))} onChange={term => dispatch(actions.changeTerm(term))} search={search.toJS()} />
                        <ResultList results={results} showAbstract={(index, visibility) => dispatch(actions.showAbstract(index, visibility))} />
                    </span>
                :
                    <Authentication onSubmit={(data) => dispatch(actions.login(url, data))} login={login.toJS()}/>
                }
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
