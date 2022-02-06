import { Router } from "express";
import FriendlyReviewsController from "../controllers/PostController";

const reviewRoutes = Router();

const reviewsController = FriendlyReviewsController;

reviewRoutes
  .route("/")
  .get(reviewsController.index)
  .post(reviewsController.create);

export default reviewRoutes;
