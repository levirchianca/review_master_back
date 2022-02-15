import { Request, Response } from "express";
import { InteractionController } from "friend_of_all/controllers";
import { Interaction } from "friend_of_all/domain";
// import InteractionDAOImpl from "src/infra/typeorm/repositories/InteractionDAOImpl";
import InterationImpl from "src/models/InteractionImpl";
// import { Post, User } from "friend_of_all/domain";
import PostControllerImpl from "./PostControllerImpl";
import PostDAOImpl from "src/infra/typeorm/repositories/PostDAOImpl";
import InteractionDAOImpl from "src/infra/typeorm/repositories/InteractionDAOImpl";


class FriendlyInterationsController {
  constructor() {}

  async index(req: Request, res: Response): Promise<Response> {
    const { work_id } = req.query;

    const interationController = new InteractionController(
      new InteractionDAOImpl()
    );

    try {
      const interactions = await interationController.listInteractionByPost(
        work_id as string
      );

      return res.json(interactions);
    } catch (error) {
      throw new Error("Failed to obtain interations from post");
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { work_id, note, title, description } = req.body;

    const postController = new PostControllerImpl(new PostDAOImpl());

    const post = await postController.getPost(work_id);

    const interation = new InterationImpl(post, req.user, note, title, description);

    const interationController = new InteractionController(
      new InteractionDAOImpl()
    );

    const createdInteration = await interationController.createInteraction(
      interation
    );

    delete createdInteration._post;
    delete createdInteration._user;

    return res.json(createdInteration);
  }

  protected async list(req: Request, res: Response): Promise<Response> {
    const { postId } = req.params;
    try {
      return res.json(
        new InteractionDAOImpl().listByPost(postId)
      );
    } catch (error) {
      throw new Error("Failed to obtain interations from post");
    }
  }
}

export default new FriendlyInterationsController();
