import React, { createClass, PropTypes } from 'react';
import { Provider } from 'react-redux';

import BibRouter from './BibRouter';
import createStore from '../store';
import actions from '../actions';

const EbscoWidget = createClass({
    getInitialState() {
        const { url, dbUrl } = this.props;
        return createStore(url, dbUrl);
    },
    componentWillMount() {
        if (window.localStorage.getItem('VERSION') !== __VERSION__) {
            this.state.dispatch(actions.reset());

            window.localStorage.setItem('VERSION', __VERSION__);
        }

        const { domain } = this.props;
        this.state.dispatch(actions.initialize(domain));

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
        dbUrl: PropTypes.string,
        domain: PropTypes.string
    }
});

export default EbscoWidget;
