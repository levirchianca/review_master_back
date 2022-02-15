import { getRepository, Repository } from "typeorm";
import { UserDAO } from "friend_of_all/DAO";
import { User } from "friend_of_all/domain";
// import { IUser, UserEntity } from "../../../models/UserModel";
import UserCustom from "../models/UserCustom";

class UserTypeOrmDAO implements UserDAO {
  private ormRepository: Repository<UserCustom>;

  constructor () {
    this.ormRepository = getRepository<UserCustom>(UserCustom);
  }
  
  async create(user: User): Promise<User> {
    const { name, email, password } = user;

    console.log("fwefw")

    let userTypeOrm = this.ormRepository.create({
      name,
      email,
      password
    });

    await this.ormRepository.save(userTypeOrm);

    user.id = String(userTypeOrm.id);

    return user;
  }

  async get(email: String, password: String): Promise<User | undefined> {
    const userTypeOrm = await this.ormRepository.findOne({
      where: { email, password }
    });

    if (!userTypeOrm) {
      return undefined;
    }

    const user = new User(
      userTypeOrm.email, 
      userTypeOrm.password, 
      userTypeOrm.name,
      String(userTypeOrm.id)
    );

    return user;
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const userTypeOrm = await this.ormRepository.findOne({
      where: { email }
    });

    console.log("sim")

    if (!userTypeOrm) {
      return undefined;
    }

    const user = new User(
      userTypeOrm.email, 
      userTypeOrm.password, 
      userTypeOrm.name,
      String(userTypeOrm.id)
    );

    return user;
  }
  
  async getById(id: string): Promise<User> {
    const parsedId = parseInt(id);

    const userTypeOrm = await this.ormRepository.findOne({
      where: { id: parsedId }
    });

    if (!userTypeOrm) {
      return undefined;
    }

    const user = new User(
      userTypeOrm.email, 
      userTypeOrm.password, 
      userTypeOrm.name,
      String(userTypeOrm.id)
    );

    return user;
  }
}

export default UserTypeOrmDAO;