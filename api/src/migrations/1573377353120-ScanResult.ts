import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const dbName = 'abidb';

export class ScanResult1573377353120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createDatabase(dbName, true)

        await queryRunner.createTable(new Table({
            name: "Result",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "status",
                    type: "text",
                },
                {
                    name: "repositoryName",
                    type: "varchar",
                },
                {
                    name: "findings",
                    type: "jsonb",
                },
                {
                    name: "queuedAt",
                    type: "timestamp",
                },
                {
                    name: "scanningAt",
                    type: "timestamp",
                    isNullable: true,
                },
                {
                    name: "finishedAt",
                    type: "timestamp",
                    isNullable: true,
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropDatabase(dbName);
    }

}
