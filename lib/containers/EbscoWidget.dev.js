import React, { createClass } from 'react';
import { Provider } from 'react-redux';
import { parse } from 'query-string';

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

        const query = parse(window.location.search);

        if (query.shib) {
            document.cookie = query.shib;
        }

        if (query.token && query.domains && query.username) {
            store.dispatch(actions.login(query.token, query.domains, query.username));
        }

        const { url, term, domain } = this.props;
        store.dispatch(actions.setUrl(url));
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
                <div>
                    <BibRouter/>
                    <DevTools/>
                </div>
            </Provider>
        );
    }
});

export default EbscoWidget;
