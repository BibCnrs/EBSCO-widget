import React from 'react';
import { Provider } from 'react-redux';

import BibRouter from './BibRouter';
import getStore from '../store';

const EbscoWidget = ({ url, term, domain }) => {

    const store = getStore(url, term, domain);
    return (
        <Provider store={store}>
            <BibRouter/>
        </Provider>
    );
};

export default EbscoWidget;
