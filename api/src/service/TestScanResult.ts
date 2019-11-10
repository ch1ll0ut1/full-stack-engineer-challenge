import { getManager } from "typeorm";

import { Result } from "../models/result";
import { validate } from "class-validator";

export default class TestScanResultService {

  public static getRepository() {
    return getManager().getRepository(Result);
  }

  public static async find() {
    return this.getRepository().find();
  }

  public static async findOne(id?: number) {
    if (!id) {
      return null;
    }

    return this.getRepository().findOne(id);
  }

  public static async create(data: object) {
    const db = this.getRepository();
    const record = await db.create(data);
    const errors = await validate(record);

    if (errors && errors.length) {
      return errors;
    }

    await db.save(record);

    return null;
  }
}