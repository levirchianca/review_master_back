import { InteractionDAO } from "friend_of_all/DAO";
import { Interaction } from "friend_of_all/domain";
import { Repository, getRepository } from "typeorm";

class InteractionDAOImpl implements InteractionDAO {
  private ormRepository: Repository<Interaction>;

  constructor() {
    this.ormRepository = getRepository(Interaction);
  }

  create(interaction: Interaction): Promise<Interaction> {
    const interactionToCreate = this.ormRepository.create(interaction);
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

export default new InteractionDAOImpl();
