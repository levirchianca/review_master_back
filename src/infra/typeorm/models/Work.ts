import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('works')
class Work {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column()
  title: string;
  
  @CreateDateColumn()
  created_at: Date;
  
  @Column()
  description: string;
}

export default Work;