import React, { createClass, PropTypes } from 'react';
import { Provider } from 'react-redux';

import DevTools from './DevTools';
import createStore from '../store';
import BibRouter from './BibRouter';
import actions from '../actions';

const EbscoWidget = createClass({
    getInitialState() {
        const { url, dbUrl, domain } = this.props;
        return createStore(url, dbUrl, domain);
    },
    componentWillMount() {
        const { domain } = this.props;
        if (window.localStorage.getItem('VERSION') !== __VERSION__) {
            this.state.dispatch(actions.reset());

            window.localStorage.setItem('VERSION', __VERSION__);
        }

        this.state.dispatch(actions.initialize(domain));
    },
    render() {
        return (
            <Provider store={this.state}>
                <div>
                    <BibRouter/>
                    <DevTools/>
                </div>
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
