import { Router } from 'express';
import PostController from '../controllers/PostController';
// import WorksController from '../controllers/WorksController';

const worksController = new PostController();

const WorkRoutes = Router();

WorkRoutes.route('/')
  .get(worksController.index)
  .post(worksController.create);

// WorkRoutes.route('/:id')
//   .get(worksController.show)
//   .put(worksController.update);

export default WorkRoutes;