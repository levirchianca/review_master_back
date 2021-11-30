import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateWork1637883048785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'works',
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
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'published_at',
            type: 'date'
          },
          {
            name: 'description',
            type: 'text'
          },
          {
            name: 'gender',
            type: 'varchar'
          },
          {
            name: 'platforms',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'game_mode',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'origin_country',
            type: 'varchar',
            isNullable: true
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('works');
    }

}
