import { Router } from 'express';
import WorksController from '../controllers/WorksController';

const worksController = new WorksController();

const WorkRoutes = Router();

WorkRoutes.route('/')
  .get(worksController.index)
  .post(worksController.create);

WorkRoutes.route('/:id')
  .get(worksController.show)
  .put(worksController.update);

export default WorkRoutes;