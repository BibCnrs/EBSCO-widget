import React from 'react';
import { Provider } from 'react-redux';

import DevTools from './DevTools';
import getStore from '../store';
import BibRouter from './BibRouter';

const EbscoWidget = ({ url, term, domain }) => {
    const store = getStore(url, term, domain);

    return (
        <Provider store={store}>
            <div>
                <BibRouter/>
                <DevTools/>
            </div>
        </Provider>
    );
};

export default EbscoWidget;
