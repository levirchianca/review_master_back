import { Router } from 'express';
import ReviewRoutes from './reviews.routes';
import WorkRoutes from './works.routes';

const router = Router();

router.use("/reviews", ReviewRoutes);

router.use("/works", WorkRoutes);

export default router;