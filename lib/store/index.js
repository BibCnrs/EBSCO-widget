'use strict';

import fetchMiddleware from '../middleware/fetch';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(
    fetchMiddleware
)(createStore);

export default createStoreWithMiddleware(reducers);
