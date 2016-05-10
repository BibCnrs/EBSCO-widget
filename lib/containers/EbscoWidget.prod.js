import React, { createClass } from 'react';
import { Provider } from 'react-redux';
import { parse } from 'query-string';

import BibRouter from './BibRouter';
import store from '../store';
import actions from '../actions';

const EbscoWidget = createClass({
    componentWillMount: function () {

        if (window.localStorage.getItem('VERSION') !== __VERSION__) {
            store.dispatch(actions.reset());

            window.localStorage.setItem('VERSION', __VERSION__);
        }
        const query = parse(window.location.search);

        if (query.shib) {
            document.cookie = query.shib;
        }

        if (query.token && query.domains) {
            store.dispatch(actions.login(query.token, [].concat(query.domains), query.username));
        }

        if (Object.keys(query).length > 0) {
            document.location.href = window.location.href.replace(window.location.search,'');
        }

        const { url, term, domain } = this.props;
        if(url) {
            store.dispatch(actions.setUrl(url));
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
            store.dispatch(actions.article.changeDomain(domain));
            store.dispatch(actions.publication.changeDomain(domain));
        }
        if (term) {
            store.dispatch(actions.article.changeQuery(term, 'term'));
            store.dispatch(actions.article.searchTerm());
        }
    },
    render: function () {
        return (
            <Provider store={store}>
                <BibRouter/>
            </Provider>
        );
    }
});

export default EbscoWidget;
