import React, { Component } from 'react';
import App from './App';
import Provider from 'react-redux';

import getStore from '../store';

export default class EbscoWidget extends Component {
    render() {
        const { url, term, domain } = this.props;

        const store = getStore(url, term, domain);
        return (
            <Provider store={store}>
                <App term={term} domain={domain} />
            </Provider>
        );
    }
}
