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


export const ReviewSchema = new EntitySchema({
  name: 'reviews',
  columns: {
    id: {
      type: 'integer',
      generated: 'increment',
      primary: true,
    },
    title: {
      type: 'varchar'
    },
    description: {
      type: 'varchar'
    },
    note: {
      type: 'tinyint'
    },
    user: {
      type: 'integer'
    },
    work: {
      type: 'integer'
    }
  }
});

export default ReviewSchema;