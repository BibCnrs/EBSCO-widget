

import path from 'path';
import koa from 'koa';
import koaStatic from 'koa-static';
import koaMount from 'koa-mount';

const app = koa();

app.use(koaMount('/scripts', koaStatic(path.join(__dirname, '../build'))));
app.use(koaMount('/', koaStatic(path.join(__dirname, '/public'), { maxage: 5 * 60 * 1000 })));

export default app;
