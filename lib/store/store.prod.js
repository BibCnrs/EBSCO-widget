import { createStore, applyMiddleware } from 'redux';

import fetchMiddleware from '../middlewares/fetch';
import loginTokenMiddleware from '../middlewares/loginToken';
import retrieveMiddleware from '../middlewares/retrieve';
import searchMiddleware from '../middlewares/search';
import reducers from '../reducers';

export default function store(url, term, domain) {

    const finalCreateStore = applyMiddleware(
        searchMiddleware,
        retrieveMiddleware,
        fetchMiddleware,
        loginTokenMiddleware
    )(createStore);

    return finalCreateStore(reducers(url, term, domain));
}
