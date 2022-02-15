import { Request, Response } from "express";
import { UserController } from "friend_of_all/controllers";
import { User } from "friend_of_all/domain";
import { UserAlreadyExistsError } from "friend_of_all/errors";
import AppError from "src/errors/AppError";
import UserTypeOrmDAO from "src/infra/typeorm/repositories/UserDAOImpl";


class UsersController {
  constructor() {}

  // async getUser(req: any): Promise<User[]> {
  //   const userController = new UserController(UserControllerImpl);

  //   const users: User[] = await userController.getUser(
  //     req.body.email,
  //     req.body.password
  //   );

  //   return users;
  // }

  public async create(req: Request, res: Response): Promise<Response> {

    const user = new User(req.body.email, req.body.password, req.body.name);

    const userController = new UserController(new UserTypeOrmDAO());

    try {
      const { email, id, name } = await userController.createUser(user);

      return res.json({
        email,
        id,
        name
      });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        throw new AppError("User already exists", 400);
      }
    }
  }

  // public async ensuredAuthenticated(req: Request): Promise<User> {
  //   const userController = new UserControllerImpl(UserControllerImpl);

  //   const verifiedUser = await userController.ensuredAuthenticated(
  //     req.body.token
  //   ); //<< verificar o header?

  //   return verifiedUser;
  // }

  public async createSession(req: Request, res: Response): Promise<Response> {

    const { email, password } = req.body;

    const userController = new UserController(new UserTypeOrmDAO());

    const user = await userController.getUser(email, password);

    if (!user) {
      throw new AppError("Invalid email or password");
    }

    const token = await userController.signin(user);

    return res.json({ token });
  }
}

export default UsersController;
