import { SwaggerRouter } from 'koa-swagger-decorator';
import controller = require('./controller');

const protectedRouter = new SwaggerRouter({
    prefix: '/api/v1',
});

// Test Scan Results ROUTES
protectedRouter.get('/results', controller.TestScanResult.getResults);
protectedRouter.get('/results/:id', controller.TestScanResult.getResult);
protectedRouter.post('/results', controller.TestScanResult.createResult);
protectedRouter.put('/results/:id', controller.TestScanResult.updateResult);
protectedRouter.delete('/results/:id', controller.TestScanResult.deleteResult);
protectedRouter.delete('/testresults', controller.TestScanResult.deleteTestResults);

// Swagger endpoint  (/)
protectedRouter.swagger({
    title: 'API',
    description: 'Rest Api to read and write scan results',
    version: '1.5.0',
});

// mapDir will scan the input dir, and automatically call router.map to all Router Class
protectedRouter.mapDir(__dirname);

export { protectedRouter };