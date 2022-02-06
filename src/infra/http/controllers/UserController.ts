import { Request } from "express";
import { UserController } from "friend_of_all/controllers";
import { User } from "friend_of_all/domain";
import UserControllerImpl from "./UserControllerImpl";

class FriendlyUsersController {
  constructor() {}

  async getUser(req: any): Promise<User[]> {
    const userController = new UserController(UserControllerImpl);

    const users: User[] = await userController.getUser(
      req.body.email,
      req.body.password
    );

    return users;
  }

  public async create(req: Request): Promise<User> {
    const user = new User(req.body.email, req.body.password, req.body.name);

    const userController = new UserControllerImpl(UserControllerImpl);

    const createdUser = await userController.createUser(user);

    return createdUser;
  }

  public async ensuredAuthenticated(req: Request): Promise<User> {
    const userController = new UserControllerImpl(UserControllerImpl);

    const verifiedUser = await userController.ensuredAuthenticated(
      req.body.token
    ); //<< verificar o header?

    return verifiedUser;
  }

  public async signIn(req: Request): Promise<String> {
    const userController = new UserControllerImpl(UserControllerImpl);

    const user = req.body.user;

    const token = await userController.signin(user);

    return token;
  }
}

export default new FriendlyUsersController();
