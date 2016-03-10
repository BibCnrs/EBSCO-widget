import React, { createClass } from 'react';
import { Provider } from 'react-redux';

import BibRouter from './BibRouter';
import store from '../store';
import actions from '../actions';

const EbscoWidget = createClass({
    componentWillMount: function () {
        const { url, term, domain } = this.props;
        store.dispatch(actions.setUrl(url));
        const availableDomains = JSON.parse(window.sessionStorage.getItem('domains') || '[]');
        store.dispatch(actions.setAvailableDomains(availableDomains));
        const history = JSON.parse(window.localStorage.getItem('history')) || [];
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
