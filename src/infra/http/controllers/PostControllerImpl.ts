import { PostController } from "friend_of_all/controllers";
import { Post } from "friend_of_all/domain";
import PostDAOImpl from "src/infra/typeorm/repositories/PostDAOImpl";

class PostControllerImpl extends PostController {
  protected async list(title?: string, description?: string): Promise<Post[]> {
    try {
      return await new PostDAOImpl().list(title, description);
    } catch (error) {
      throw new Error("Failed to obtain posts");
    }
  }

  protected order(posts: Post[], by?: string): Promise<Post[]> {
    if (by === "popularity") {
      //todo
    } else if (by === "createdBy") {
      return new Promise((resolve) => {
        resolve(
          posts.sort(
            (a, b) =>
              // TODO: fix createdAt type and remove toString()
              new Date(b.createdAt.toString()).getTime() -
              new Date(a.createdAt.toString()).getTime()
          )
        );
      });
    } else if (by === "title") {
      return new Promise((resolve, reject) => {
        resolve(posts.sort());
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(posts);
      });
    }
  }
}

export default PostControllerImpl;
