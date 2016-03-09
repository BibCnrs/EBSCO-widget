const  koa = require('koa');
const route = require('koa-route');
const cobody = require('co-body');
const cors = require('koa-cors');

const app = koa();

app.use(cors({origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], headers: ['Content-Type', 'Authorization']}));

app.use(route.post('/login', function* () {
    const body = yield cobody(this);
    const username = body.username;
    const password = body.password;
    if (username !== 'test' || password !== 'secret') {
        this.status = 401;

        return;
    }
    this.body = {
        token: 'token',
        domains: ['vie', 'shs']
    };

}));

module.exports = app;
