import { Interaction } from "friend_of_all/domain";
import { EntitySchema } from "typeorm";

export class IReview extends Interaction {
  id: number;
  title: string;
  description: string;
  note: number;
  // work: number;
  // autor: number;
}


export const ReviewSchema = new EntitySchema<IReview>({
  name: 'reviews',
  columns: [
    {
      name: 'id',
      type: 'integer',
      generated: 'increment',
      primary: true,
    },
    {
      name: 'title',
      type: 'varchar'
    },
    {
      name: 'description',
      type: 'varchar'
    },
    {
      name: 'note',
      type: 'tinyint'
    },
    {
      name: 'user_id',
      type: 'integer'
    },
    {
      name: 'work_id',
      type: 'integer'
    }
  ],
  relations: [
    {
      type: 'many-to-one',
      target: 'users',
      joinColumn: {
        name: 'user_id'
      }
    },
    {
      type: 'many-to-one',
      target: 'works',
      joinColumn: {
        name: 'work_id'
      }
    }
  ]
});

export default ReviewSchema;