import { Router } from 'express';
import ReviewRoutes from './reviews.routes';
import UserRoutes from './users.routes';
import WorkRoutes from './works.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const router = Router();

router.use("/reviews", ensureAuthenticated, ReviewRoutes);

router.use("/works", ensureAuthenticated, WorkRoutes);

router.use("/users", UserRoutes);

export default router;