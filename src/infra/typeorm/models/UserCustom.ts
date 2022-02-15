import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
class UserCustom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

export default UserCustom;