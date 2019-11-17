import { getManager, Like } from "typeorm";
import { validate } from "class-validator";

import { Result } from "../models/result";

export default class TestScanResultService {

  public static getRepository() {
    return getManager().getRepository(Result);
  }

  public static async find() {
    return this.getRepository().find({ select: ['id', 'repositoryName', 'status', 'updatedAt'] });
  }

  public static async findOne(id?: number) {
    if (!id) {
      return null;
    }

    return this.getRepository().findOne(id);
  }

  public static async create(data: object & { id: number }) {
    const db = this.getRepository();
    const record = await db.create(data);
    const errors = await validate(record);

    if (errors && errors.length) {
      return errors;
    }

    // do not create if entity already exists
    if (data.id) {
      const result = await this.findOne(data.id);
      if (result) {
        return ['Entity already exists!'];
      }
    }

    return await db.save(record);
  }

  public static async update(id: number, data: object) {
    const db = this.getRepository();
    const record = await db.create(data);
    const errors = await validate(record);

    if (errors && errors.length) {
      return errors;
    }

    // check if the entity exists
    const result = await this.findOne(id);
    if (!result) {
      return ['Entity does not exists!'];
    }

    return await db.save(record);
  }

  public static async delete(id: number) {
    const db = this.getRepository();

    // check if the entity exists
    const result = await this.findOne(id);
    if (!result) {
      return ['Entity does not exists!'];
    }

    await db.delete({ id });
  }

  public static async deleteTestResults() {
    const db = this.getRepository();

    const results = await db.find({ where: { email: Like('%@citest.com') } });

    await db.remove(results);
  }
}