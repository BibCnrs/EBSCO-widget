'use strict';

import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Search from './Search';
import ResultList from './ResultList';
import Authentication from './Authentication';
import actions, { LOGIN_SUCCESS } from '../actions';

class App extends Component {
    constructor(props) {
        super(props);
        const { term, url, dispatch, login } = this.props;
        const token = this.props.token || login.get('token');

        if (term) {
            dispatch(actions.changeTerm(term));
        }
        if (token) {
            dispatch({ type: LOGIN_SUCCESS, response: { token: token } });
            if (term) {
                dispatch(actions.search(url, term, token));
            }
        }
    }
    render() {
        const { dispatch, results, url, login } = this.props;
        const token = login.get('token');
        return (
            <div>
                {token ?
                    <span>
                        <Search url={url}
                        />
                        <ResultList
                            url={url}
                        />
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

function mapStateToProps(state, ownProps) {
    return {
        ...state,
        url: ownProps.url
    };
}

export default connect(mapStateToProps)(App);
