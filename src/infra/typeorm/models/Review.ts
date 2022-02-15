import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Work from './Work';
import UserCustom from './UserCustom';

@Entity('reviews')
class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column('float')
  note: number;
  
  @Column()
  title: string;

  @Column()
  description: string;

  @Column('int')
  author_id: number;

  @Column('int')
  work_id: number;

  @ManyToOne(() => Work)
  @JoinColumn({ name: 'work_id' })
  work: Work;

  @ManyToOne(() => UserCustom)
  @JoinColumn({ name: 'author_id' })
  author: UserCustom
}

export default Review;