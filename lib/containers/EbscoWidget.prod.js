import React, { createClass, PropTypes } from 'react';
import { Provider } from 'react-redux';

import BibRouter from './BibRouter';
import createStore from '../store';
import actions from '../actions';
import getSearchParametersFromUrl from './getSearchParametersFromUrl';

const EbscoWidget = createClass({
    getInitialState() {
        return createStore();
    },
    componentWillMount() {
        const { url, domain, language } = this.props;
        const { domain: domainFromUrl, location, term } = getSearchParametersFromUrl();
        if (window.localStorage.getItem('VERSION') !== __VERSION__) {
            this.state.dispatch(actions.reset());

            window.localStorage.setItem('VERSION', __VERSION__);
        }

        this.state.dispatch(actions.initialize(url, domainFromUrl || domain, language, domainFromUrl, location, term));
    },
    render() {
        return (
            <Provider store={this.state}>
                <BibRouter/>
            </Provider>
        );
    },
    propTypes: {
        url: PropTypes.string.isRequired,
        domain: PropTypes.string,
        language: PropTypes.string
    }
});

export default EbscoWidget;
