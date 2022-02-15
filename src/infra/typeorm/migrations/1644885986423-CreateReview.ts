import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateReview1644885986423 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table(
        {
          name: 'reviews',
          columns: [
            {
              name: 'id',
              type: 'INTEGER',
              isPrimary: true,
              generationStrategy: 'increment',
              isGenerated: true,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP'
            },
            {
              name: 'note',
              type: 'float'
            },
            {
              name: 'title',
              type: 'varchar'
            },
            {
              name: 'description',
              type: 'text'
            },
            {
              name: 'author_id',
              type: 'number'
            },
            {
              name: 'work_id',
              type: 'number'
            }
          ],
          foreignKeys: [
            {
              name: 'ReviewWork',
              columnNames: ['work_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'works',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE'
            },
            {
              name: 'ReviewUser',
              columnNames: ['author_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'users',
              onDelete: 'SET NULL',
              onUpdate: 'CASCADE'
            }
          ]
        }
      ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('reviews');
    }

}
