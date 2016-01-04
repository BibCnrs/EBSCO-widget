import React, { Component } from 'react';

import App from './App';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import getStore from '../store';

export default class EbscoWidget extends Component {
    render() {
        const { url, term, domain } = this.props;

        const store = getStore(url, term, domain);
        return (
            <Provider store={store}>
                <div>
                    <App term={term} domain={domain} />
                    <DevTools/>
                </div>
            </Provider>
        );
    }
}
