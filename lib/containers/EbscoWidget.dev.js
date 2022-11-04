import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import createStore from '../store';
import BibRouter from './BibRouter';
import actions from '../actions';
import getSearchParametersFromUrl from './getSearchParametersFromUrl';

class EbscoWidget extends Component {
    constructor(props) {
        super(props);
        this.state = createStore();
    }
    UNSAFE_componentWillMount() {
        const { url, domain, language, publicationSort } = this.props;
        const {
            domain: domainFromUrl,
            location,
            term,
        } = getSearchParametersFromUrl();

        if (window.localStorage.getItem('VERSION') !== __VERSION__) {
            this.state.dispatch(actions.reset());

            window.localStorage.setItem('VERSION', __VERSION__);
        }

        if (window.Cypress && window.initialState) {
            this.state.dispatch({
                type: 'SET_STATE',
                state: window.initialState,
            });
        } else {
            this.state.dispatch(
                actions.initialize(
                    url,
                    domainFromUrl || domain,
                    language,
                    domainFromUrl,
                    location,
                    term,
                    publicationSort,
                ),
            );
        }
    }
    render() {
        return (
            <Provider store={this.state}>
                <div>
                    <BibRouter />
                </div>
            </Provider>
        );
    }
    static propTypes = {
        url: PropTypes.string.isRequired,
        domain: PropTypes.string,
        language: PropTypes.string,
        publicationSort: PropTypes.bool,
    };
}

export default EbscoWidget;
