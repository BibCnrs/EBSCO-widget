import React, { createClass } from 'react';
import { Provider } from 'react-redux';

import DevTools from './DevTools';
import store from '../store';
import BibRouter from './BibRouter';
import actions from '../actions';

const EbscoWidget = createClass({
    componentWillMount: function () {

        if (window.localStorage.getItem('VERSION') !== __VERSION__) {
            store.dispatch(actions.reset());

            window.localStorage.setItem('VERSION', __VERSION__);
        }

        const { url, domain, dbUrl } = this.props;
        if(url) {
            store.dispatch(actions.setUrl(url));
            if(!store.getState().login.token) {
                store.dispatch(actions.login(url));
            }
        }

        if(dbUrl) {
            store.dispatch(actions.setDbUrl(dbUrl));
        }

        if (!window.localStorage.getItem('EBSCO_WIDGET_allDomains')) {
            store.dispatch(actions.fetchDomains(url));
        } else {
            store.dispatch({
                type: 'FETCH_DOMAINS_SUCCESS',
                response: JSON.parse(window.localStorage.getItem('EBSCO_WIDGET_allDomains'))
            });
        }

        const history = JSON.parse(window.localStorage.getItem('EBSCO_WIDGET_history')) || [];
        store.dispatch(actions.setHistory(history));

        if (domain) {
            store.dispatch(actions.changeDomain('article', domain));
            store.dispatch(actions.changeDomain('publication', domain));
            store.dispatch(actions.changeDomain('a2z', domain));
        }
    },
    render: function () {
        return (
            <Provider store={store}>
                <div>
                    <BibRouter/>
                    <DevTools/>
                </div>
            </Provider>
        );
    }
});

export default EbscoWidget;
