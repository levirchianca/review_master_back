import { EntitySchema } from "typeorm";

export interface IWork {
  id: number;
  name: string;
  created_at: Date;
  published_at: Date;
  description: string
  gender: string
  platforms?: string
  game_mode?: string
  origin_country?: string;
}

export const WorkSchema = new EntitySchema({
  name: "works",
  columns: {
    id: {
      type: 'integer',
      generated: 'increment',
      primary: true,
    },
    title: {
      type: 'varchar'
    },
    created_at: {
      type: 'date',
      nullable: true,
      default: new Date().toLocaleString()
    },
    description: {
      type: 'varchar'
    },
  }
});

// @Entity('works')
// class Work {
//   @PrimaryGeneratedColumn('increment')
//   id: number;
  
//   @Column()
//   name: string;
  
//   @CreateDateColumn()
//   created_at: Date;
  
//   @Column('date')
//   published_at: Date;
  
//   @Column()
//   description: string;

//   @Column()
//   gender: string;

//   @Column()
//   platforms?: string;

//   @Column()
//   game_mode?: string;

//   @Column()
//   origin_country?: string;
// }

export default WorkSchema;