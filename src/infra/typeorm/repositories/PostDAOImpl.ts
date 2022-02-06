import { PostDAO } from "friend_of_all/DAO";
import { getRepository, Repository } from "typeorm";
import { Post } from "friend_of_all/domain";

class PostDAOImpl implements PostDAO {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async create(post: Post): Promise<Post> {
    const postOrm = this.ormRepository.create(post);
    return this.ormRepository.save(postOrm);
  }

  public async list(title?: string, description?: string): Promise<Post[]> {
    try {
      return this.ormRepository.find({
        title: title,
        description: description,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new PostDAOImpl();
