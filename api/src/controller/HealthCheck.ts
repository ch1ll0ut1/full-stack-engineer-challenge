import { BaseContext } from 'koa';
import { description, request, summary, tagsAll } from 'koa-swagger-decorator';

@tagsAll(['HealthCheck'])
export default class HealthCheckController {

    @request('get', '/')
    @summary('Health Check')
    @description('A simple message to verify the service is up and running.')
    public static async getStatus(ctx: BaseContext) {
        ctx.body = 'Ok';
    }
}