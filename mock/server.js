import koa from 'koa';
import route from 'koa-route';
import cobody from 'co-body';
import cors from 'koa-cors';

const app = koa();

app.use(cors({origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], headers: ['Content-Type', 'Authorization']}));

app.use(route.post('/login', function* () {
    const { username, password} = yield cobody(this);
    if (username !== 'test' || password !== 'secret') {
        this.status = 401;

        return;
    }
    this.body = {
        token: 'token',
        domains: ['vie', 'shs']
    };

}));

app.use(route.get('/:domainName/article/search', function* articleSearch(domainName) {
    this.body = require(`./jsonResponse/${domainName}/article/search/aids${this.query.currentPage || 1}.json`);
}));

app.use(route.get('/:domainName/article/retrieve/:dbId/:an', function* articleRetrieve(domainName) {
    this.body = require(`./jsonResponse/${domainName}/article/retrieve/aids01.json`);
}));

app.use(route.get('/:domainName/publication/search', function* publicationSearch(domainName) {
    this.body = require(`./jsonResponse/${domainName}/publication/search/study${this.query.currentPage || 1}.json`);
}));

app.use(route.get('/:domainName/publication/retrieve/:id', function* publicationRetrieve(domainName) {
    this.body = require(`./jsonResponse/${domainName}/publication/retrieve/study01.json`);
}));

module.exports = app;
