import { UserDAO } from "friend_of_all/DAO";
import { User } from "friend_of_all/domain";
import { Repository, getRepository } from "typeorm";

class UserDAOImpl implements UserDAO {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  create(user: User): Promise<User> {
    try {
      const newUser = this.ormRepository.create(user);
      return this.ormRepository.save(newUser);
    } catch (e) {
      console.error(e);
    }
  }

  get(email: string, password: string): Promise<User>;
  get(email: string): Promise<User>;
  get(email: string, password?: string): Promise<User> {
    try {
      return this.ormRepository.findOne({
        where: { email, password },
      });
    } catch (error) {
      console.error(error);
    }
  }

  getById(id: string): Promise<User | undefined> {
    try {
      return this.ormRepository.findOne({
        where: { id },
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export default new UserDAOImpl();
