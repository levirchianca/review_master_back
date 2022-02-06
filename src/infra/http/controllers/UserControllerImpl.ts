import { UserController } from "friend_of_all/controllers";
import { User } from "friend_of_all/domain";
import UserDAOImpl from "src/infra/typeorm/repositories/UserDAOImpl";

class UserControllerImpl extends UserController {
  protected async get(email?, password?): Promise<User> {
    try {
      return UserDAOImpl.get(email, password);
    } catch (error) {
      throw new Error("Failed to obtain interations from post");
    }
  }
  protected async getById(id): Promise<User> {
    try {
      return UserDAOImpl.getById(id);
    } catch (error) {
      throw new Error("Failed to obtain interations from post");
    }
  }

  protected async create(user: User): Promise<User> {
    try {
      return UserDAOImpl.create(user);
    } catch (error) {
      throw new Error("Failed to obtain interations from post");
    }
  }
}

export default UserControllerImpl;
