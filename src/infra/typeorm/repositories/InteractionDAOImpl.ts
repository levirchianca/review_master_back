import { InteractionDAO } from "friend_of_all/DAO";
// import Review from "src/models/Review";
import { Interaction, User, Post } from "friend_of_all/domain";
import InterationImpl from "src/models/InteractionImpl";
import { Repository, getRepository } from "typeorm";
// import { IReview } from "src/models/ReviewModel";
import Review from "../models/Review";

class InteractionDAOImpl implements InteractionDAO {
  private ormRepository: Repository<Review>;

  constructor() {
    this.ormRepository = getRepository<Review>(Review);
  }

  async create(data: InterationImpl): Promise<Interaction> {
    // const interactionToCreate = this.ormRepository.create(review);

    const interactionToCreate = this.ormRepository.create({
      author_id: parseInt(data.user.id),
      work_id: parseInt(data.post.id),
      ...data
    });

    const createdCustomInteraction = await this.ormRepository.save(interactionToCreate);

    const review = new InterationImpl(
      data.post,
      data.user,
      createdCustomInteraction.note,
      createdCustomInteraction.title,
      createdCustomInteraction.description,
      String(createdCustomInteraction.id)
    );

    return review;
  }

  async listByPost(postId: string): Promise<Interaction[]> {
    try {
      // TODO: verificar com Levir
      const customInteractions = await this.ormRepository.find({
        where: {
          work_id: postId
        },
        relations: ["author", "work"],
      });

      return customInteractions.map(interaction => {
        const user = new User(
          interaction.author.email,
          interaction.author.password,
          interaction.author.name,
          String(interaction.author.id)
        );

        const work = new Post(
          interaction.work.title,
          interaction.work.description,
          String(interaction.work_id)
        );

        return new InterationImpl(
          work,
          user,
          interaction.note,
          interaction.title,
          interaction.description,
          String(interaction.id),
        )
      })

    } catch (error) {
      throw new Error(error);
    }
  }
}

export default InteractionDAOImpl;
