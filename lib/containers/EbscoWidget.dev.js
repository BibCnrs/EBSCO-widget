import React, { createClass } from 'react';
import { Provider } from 'react-redux';

import DevTools from './DevTools';
import store from '../store';
import BibRouter from './BibRouter';
import actions from '../actions';

const EbscoWidget = createClass({
    componentWillMount: function () {
        const { url, term, domain } = this.props;
        store.dispatch(actions.setUrl(url));
        const availableDomains = JSON.parse(window.sessionStorage.getItem('domains') || []);
        store.dispatch(actions.setAvailableDomains(availableDomains));

        if (domain) {
            store.dispatch(actions.article.changeDomain(domain));
            store.dispatch(actions.publication.changeDomain(domain));
        } else {
            store.dispatch(actions.article.changeDomain(availableDomains[0]));
            store.dispatch(actions.publication.changeDomain(availableDomains[0]));
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
