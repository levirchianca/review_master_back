import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListReviewsService from 'src/services/ListReviewsService';
import CreateReviewService from 'src/services/CreateReviewService';

class ReviewsController {
  async index(request: Request, response: Response): Promise<Response> {
    const { work_id, page=1, limit=15 } = request.query;

    const listReviews = container.resolve(ListReviewsService);

    const {reviews, totalCount} = await listReviews.execute({
      work_id: Number(work_id),
      page: Number(page),
      limit: Number(limit)
    });

    response.header('X-Total-Count', String(totalCount));

    return response.json(reviews);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const {
      work_id,
      note,
      title,
      description,
      author
    } = request.body;

    const createReview = container.resolve(CreateReviewService);

    const review = await createReview.execute({
      work_id: Number(work_id),
      author: author as string,
      description: description as string,
      note: note as string,
      title: title as string
    });

    return response.json(review);
  }
}

export default ReviewsController;