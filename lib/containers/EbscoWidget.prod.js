import React, { createClass } from 'react';
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

        const { url, term, domain } = this.props;
        if(url) {
            store.dispatch(actions.setUrl(url));
        }
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
