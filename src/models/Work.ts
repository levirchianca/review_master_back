import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('works')
class Work {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column()
  name: string;
  
  @CreateDateColumn()
  created_at: Date;
  
  @Column('date')
  published_at: Date;
  
  @Column()
  description: string;

  @Column()
  gender: string;

  @Column()
  platforms?: string;

  @Column()
  game_mode?: string;

  @Column()
  origin_country?: string;
}

export default Work;