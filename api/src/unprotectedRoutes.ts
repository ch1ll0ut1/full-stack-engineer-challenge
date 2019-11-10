import Router from 'koa-router';
import controller = require('./controller');

const unprotectedRouter = new Router();

// HealthCheck Controller
unprotectedRouter.get('/', controller.HealthCheck.getStatus);

export { unprotectedRouter };