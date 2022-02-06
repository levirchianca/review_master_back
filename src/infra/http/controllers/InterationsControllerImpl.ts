import { InteractionController } from "friend_of_all/controllers";
import { Interaction } from "friend_of_all/domain";
import InteractionDAOImpl from "src/infra/typeorm/repositories/InteractionDAOImpl";

class InterationControllerImpl extends InteractionController {
  protected async list(post): Promise<Interaction[]> {
    try {
      return InteractionDAOImpl.listByPost(post);
    } catch (error) {
      throw new Error("Failed to obtain interations from post");
    }
  }
}

export default InterationControllerImpl;
