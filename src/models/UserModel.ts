import { EntitySchema } from "typeorm";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const UserEntity = new EntitySchema({
  name: "users",
  columns: {
    id: {
      type: 'integer',
      generated: 'increment',
      primary: true,
    },
    name: {
      type: 'varchar'
    },
    email: {
      type: 'varchar',
      unique: true,
      nullable: false
    },
    password: {
      type: 'varchar'
    }
  }
});

export default UserEntity;