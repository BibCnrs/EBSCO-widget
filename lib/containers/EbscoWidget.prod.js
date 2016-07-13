import React, { createClass, PropTypes } from 'react';
import { Provider } from 'react-redux';

import BibRouter from './BibRouter';
import store from '../store';
import actions from '../actions';

const EbscoWidget = createClass({
    componentWillMount: function () {

        if (window.localStorage.getItem('VERSION') !== __VERSION__) {
            store.dispatch(actions.reset());

            window.localStorage.setItem('VERSION', __VERSION__);
        }

        const { url, domain, dbUrl } = this.props;
        store.dispatch(actions.initialize(url, dbUrl, domain));

    },
    render: function () {
        return (
            <Provider store={store}>
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
