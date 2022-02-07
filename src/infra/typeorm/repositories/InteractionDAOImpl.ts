import { InteractionDAO } from "friend_of_all/DAO";
import Review from "src/models/Review";
import { Interaction } from "friend_of_all/domain";
import { Repository, getRepository } from "typeorm";
import { IReview, ReviewSchema } from "src/models/ReviewModel";

class InteractionDAOImpl implements InteractionDAO {
  private ormRepository: Repository<IReview>;

  constructor() {
    this.ormRepository = getRepository<IReview>(ReviewSchema);
  }

  create(review: IReview): Promise<Interaction> {
    const interactionToCreate = this.ormRepository.create(review);

    return this.ormRepository.save(interactionToCreate);
  }

  listByPost(postId: string): Promise<Interaction[]> {
    try {
      // TODO: verificar com Levir
      return this.ormRepository.find({
        where: postId,
        relations: ["user"],
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default InteractionDAOImpl;
