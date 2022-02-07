import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1644195260288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "users",
        columns: [
            {
                name: 'id',
                type: 'INTEGER',
                isPrimary: true,
                generationStrategy: 'increment',
                isGenerated: true,
            },
            {
                name: 'name',
                type: 'varchar'
            },
            {
                name: 'email',
                type: 'varchar',
                isUnique: true,
                isNullable: false
            },
            {
                name: 'password',
                type: 'varchar'
            }
        ]
    }
    ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users");
    }

}
