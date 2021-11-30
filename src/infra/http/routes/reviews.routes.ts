import { Router } from 'express';
import ReviewsController from '../controllers/ReviewsController';

const reviewRoutes = Router();

const reviewsController = new ReviewsController();

reviewRoutes.route('/')
  .get(reviewsController.index)
  .post(reviewsController.create);

export default reviewRoutes;