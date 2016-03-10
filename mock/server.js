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
    this.body = require(`./jsonResponse/${domainName}/article/search/aids.json`);
}));

module.exports = app;
