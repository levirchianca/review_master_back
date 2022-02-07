import Router from "express";
import UsersController from "../controllers/UserController";

const userRouter = Router();
const userController = new UsersController();

userRouter.post('/', userController.create);

userRouter.post('/session', userController.createSession);

export default userRouter;