import { Request, response, Response } from "express";
import { InteractionController } from "friend_of_all/controllers";
import { Interaction } from "friend_of_all/domain";
// import InterationControllerImpl from "./InterationsControllerImpl";
import InteractionDAOImpl from "src/infra/typeorm/repositories/InteractionDAOImpl";

class InterationImpl extends Interaction {
  note: string;
  title: string;
  description: string;

  constructor(post, user, note: string, title: string, description: string) {
    super(post, user);
    this.note = note;
    this.title = title;
    this.description = description;
  }
}

class FriendlyInterationsController {
  constructor() {}

  async index(req: Request, res: Response): Promise<Response> {
    const interationController = new InteractionController(
      new InteractionDAOImpl()
    );

    const interations: Interaction[] =
      await interationController.listInteractionByPost(req.body.post);

    return res.json(interations);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { post, user, note, title, description } = req.body;

    const interation = new InterationImpl(post, user, note, title, description);

    const interationController = new InteractionController(
      new InteractionDAOImpl()
    );

    const createdInteration = await interationController.createInteraction(
      interation
    );

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
