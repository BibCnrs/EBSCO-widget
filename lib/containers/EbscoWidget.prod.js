import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import BibRouter from './BibRouter';
import createStore from '../store';
import actions from '../actions';
import getSearchParametersFromUrl from './getSearchParametersFromUrl';

class EbscoWidget extends Component {
    constructor(props) {
        super(props);
        this.state = createStore();
    }
    componentWillMount() {
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
    render() {
        return (
            <Provider store={this.state}>
                <BibRouter />
            </Provider>
        );
    }
    static propTypes = {
        url: PropTypes.string.isRequired,
        domain: PropTypes.string,
        language: PropTypes.string,
        publicationSort: PropTypes.bool.isRequired,
    };
}

export default EbscoWidget;
