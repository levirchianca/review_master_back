import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Work from './Work';

@Entity('reviews')
class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  note: string;
  
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column('int')
  work_id: number;

  @ManyToOne(() => Work)
  @JoinColumn({ name: 'work_id' })
  work: Work;
}

export default Review;