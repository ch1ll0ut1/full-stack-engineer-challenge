import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal, Like } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { request, summary, path, body, responsesAll, tagsAll } from 'koa-swagger-decorator';

import { Result, resultSchema } from '../models/result';
import TestScanResultService from '../service/TestScanResult';

@responsesAll({ 200: { description: 'success' }, 400: { description: 'bad request' }, 401: { description: 'unauthorized, missing/wrong jwt token' } })
@tagsAll(['Result'])
export default class ResultController {

    @request('get', '/results')
    @summary('Find all results')
    public static async getResults(ctx: BaseContext) {
        const results = await TestScanResultService.find();

        ctx.status = 200;
        ctx.body = results;
    }

    @request('get', '/results/{id}')
    @summary('Find result by id')
    @path({ id: { type: 'number', required: true, description: 'id of result' } })
    public static async getResult(ctx: BaseContext) {
        const id = parseInt(ctx.params.id, 10);
        const result = await TestScanResultService.findOne(id);

        if (result) {
            ctx.status = 200;
            ctx.body = result;
        } else {
            ctx.status = 400;
            ctx.body = 'The result you are trying to retrieve doesn\'t exist in the db';
        }

    }

    @request('post', '/results')
    @summary('Create a result')
    @body(resultSchema)
    public static async createResult(ctx: BaseContext) {
        const errors = await TestScanResultService.create(ctx.request.body);

        if (errors) {
            ctx.status = 400;
            ctx.body = { errors };
        } else {
            ctx.status = 201;
        }
    }

    @request('put', '/results/{id}')
    @summary('Update a result')
    @path({ id: { type: 'number', required: true, description: 'id of result' } })
    @body(resultSchema)
    public static async updateResult(ctx: BaseContext) {

        // // get a result repository to perform operations with result
        // const resultRepository: Repository<Result> = getManager().getRepository(Result);

        // // update the result by specified id
        // // build up entity result to be updated
        // const resultToBeUpdated: Result = new Result();
        // resultToBeUpdated.id = +ctx.params.id || 0; // will always have a number, this will avoid errors
        // resultToBeUpdated.name = ctx.request.body.name;
        // resultToBeUpdated.email = ctx.request.body.email;

        // // validate result entity
        // const errors: ValidationError[] = await validate(resultToBeUpdated); // errors is an array of validation errors

        // if (errors.length > 0) {
        //     // return BAD REQUEST status code and errors array
        //     ctx.status = 400;
        //     ctx.body = errors;
        // } else if (!await resultRepository.findOne(resultToBeUpdated.id)) {
        //     // check if a result with the specified id exists
        //     // return a BAD REQUEST status code and error message
        //     ctx.status = 400;
        //     ctx.body = 'The result you are trying to update doesn\'t exist in the db';
        // } else if (await resultRepository.findOne({ id: Not(Equal(resultToBeUpdated.id)), email: resultToBeUpdated.email })) {
        //     // return BAD REQUEST status code and email already exists error
        //     ctx.status = 400;
        //     ctx.body = 'The specified e-mail address already exists';
        // } else {
        //     // save the result contained in the PUT body
        //     const result = await resultRepository.save(resultToBeUpdated);
        //     // return CREATED status code and updated result
        //     ctx.status = 201;
        //     ctx.body = result;
        // }

    }

    @request('delete', '/results/{id}')
    @summary('Delete result by id')
    @path({
        id: { type: 'number', required: true, description: 'id of result' }
    })
    public static async deleteResult(ctx: BaseContext) {

        // // get a result repository to perform operations with result
        // const resultRepository = getManager().getRepository(Result);

        // // find the result by specified id
        // const resultToRemove: Result = await resultRepository.findOne(+ctx.params.id || 0);
        // if (!resultToRemove) {
        //     // return a BAD REQUEST status code and error message
        //     ctx.status = 400;
        //     ctx.body = 'The result you are trying to delete doesn\'t exist in the db';
        // } else if (+ctx.state.result.id !== resultToRemove.id) {
        //     // check result's token id and result id are the same
        //     // if not, return a FORBIDDEN status code and error message
        //     ctx.status = 403;
        //     ctx.body = 'A result can only be deleted by himself';
        // } else {
        //     // the result is there so can be removed
        //     await resultRepository.remove(resultToRemove);
        //     // return a NO CONTENT status code
        //     ctx.status = 204;
        // }

    }

    @request('delete', '/testresults')
    @summary('Delete results generated by integration and load tests')
    public static async deleteTestResults(ctx: BaseContext) {

        // // get a result repository to perform operations with result
        // const resultRepository = getManager().getRepository(Result);

        // // find test results
        // const resultsToRemove: Result[] = await resultRepository.find({ where: { email: Like('%@citest.com') } });

        // // the result is there so can be removed
        // await resultRepository.remove(resultsToRemove);

        // // return a NO CONTENT status code
        // ctx.status = 204;
    }

}
