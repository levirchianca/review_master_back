import { Router } from "express";
// import FriendlyReviewsController from "../controllers/PostController";
import FriendlyInterationsController from "../controllers/InterationController";

const reviewRoutes = Router();

const reviewsController = FriendlyInterationsController;

reviewRoutes
  .route("/")
  .get(reviewsController.index)
  .post(reviewsController.create);

export default reviewRoutes;
