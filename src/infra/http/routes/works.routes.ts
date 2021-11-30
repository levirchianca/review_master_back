import { Router } from 'express';
import WorksController from '../controllers/WorksController';

const worksController = new WorksController();

const WorkRoutes = Router();

WorkRoutes.get('/', worksController.index);

WorkRoutes.get('/:id', worksController.show);

export default WorkRoutes;