import { Router } from 'express';
import ReviewRoutes from './reviews.routes';
import UserRoutes from './users.routes';
import WorkRoutes from './works.routes';

const router = Router();

router.use("/reviews", ReviewRoutes);

router.use("/works", WorkRoutes);

router.use("/users", UserRoutes);

export default router;