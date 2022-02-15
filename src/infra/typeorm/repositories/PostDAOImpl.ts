import { PostDAO } from "friend_of_all/DAO";
import { getRepository, ILike, Repository } from "typeorm";
import { Post } from "friend_of_all/domain";
// import { IWork, WorkSchema } from "../../../models/WorkModel";
import Work from "../models/Work";

class PostDAOImpl implements PostDAO {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository<Post>(Work);
  }

  public async create(post: Post): Promise<Post> {
    const postOrm = this.ormRepository.create(post);

    return this.ormRepository.save(postOrm);
  }

  public async list(title?: string, description?: string): Promise<Post[]> {
    try {
      let query = {};

      if (title) {
        query = { ...query, title: ILike(`%${title}%`) };
      }

      if (description) {
        query = { ...query, description: ILike(`%${description}%`) };
      }

      return await this.ormRepository.find(query);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getById(id: string): Promise<Post | undefined> {
    return await this.ormRepository.findOne({
      where: { id }
    });
  }
}

export default PostDAOImpl;
