import { Request, Response } from "express";
import { container } from "tsyringe";

import ListReviewsService from "src/services/ListReviewsService";
import CreateReviewService from "src/services/CreateReviewService";
import DeleteReviewService from "src/services/DeleteReviewService";

import { Post } from "friend_of_all/domain";

import PostControllerImpl from "./PostControllerImpl";
// import PostController from "friend_of_all/controllers/PostController";
import PostDAOImpl from "../../typeorm/repositories/PostDAOImpl";
import { Console } from "console";

interface IRequest {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

class FriendlyPostsController {

  async index(req: Request, res: Response): Promise<Response> {
    const { title, description, orderBy = " " } = req.query;
    const postController = new PostControllerImpl(new PostDAOImpl());

    const post: Post[] = await postController.listPost(
      title as string,
      description as string,
      orderBy as string
    );

    return res.json(post);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const postController = new PostControllerImpl(new PostDAOImpl());

    const post = await postController.getPost(id);

    return res.json(post);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;

    const post = new Post(
      title,
      description,
    );

    const postController = new PostControllerImpl(new PostDAOImpl());

    const createdPost = await postController.createPost(post);

    return res.json(createdPost);
  }
}

// class ReviewsController {
//   async index(request: Request, response: Response): Promise<Response> {
//     const { work_id, page = 1, limit = 15 } = request.query;

//     const listReviews = container.resolve(ListReviewsService);

//     const { reviews, totalCount } = await listReviews.execute({
//       work_id: Number(work_id),
//       page: Number(page),
//       limit: Number(limit),
//     });

//     response.header("X-Total-Count", String(totalCount));

//     return response.json(reviews);
//   }

//   async create(request: Request, response: Response): Promise<Response> {
//     const { work_id, note, title, description, author } = request.body;

//     const createReview = container.resolve(CreateReviewService);

//     const review = await createReview.execute({
//       work_id: Number(work_id),
//       author: author as string,
//       description: description as string,
//       note: note as string,
//       title: title as string,
//     });

//     return response.json(review);
//   }

//   async delete(request: Request, response: Response): Promise<Response> {
//     const { id } = request.params;

//     const deleteReview = container.resolve(DeleteReviewService);

//     await deleteReview.execute(Number(id));

//     return response.sendStatus(204);
//   }
// }

export default FriendlyPostsController;
