import { Request } from "express";
import { InteractionController } from "friend_of_all/controllers";
import { Interaction } from "friend_of_all/domain";
import InterationControllerImpl from "./InterationsControllerImpl";

class InterationImpl extends Interaction {
  constructor(post, user) {
    super(post, user);
  }
}

class FriendlyInterationsController {
  constructor() {}

  async index(req: any): Promise<Interaction[]> {
    const interationController = new InteractionController(
      InterationControllerImpl
    );

    const interations: Interaction[] =
      await interationController.listInteractionByPost(req.body.post);

    return interations;
  }

  public async create(req: Request): Promise<Interaction> {
    const interation = new InterationImpl(req.body.post, req.body.user);

    const interationController = new InterationControllerImpl(
      InterationControllerImpl
    );

    const createdInteration = await interationController.createInteraction(
      interation
    );

    return createdInteration;
  }
}

export default new FriendlyInterationsController();
