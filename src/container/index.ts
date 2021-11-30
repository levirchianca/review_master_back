import { container } from 'tsyringe';

import WorksRepository from 'src/infra/typeorm/repositories/WorksRepository';
import IWorksRepository from 'src/repositories/IWorksRepository';

import ReviewsRepository from 'src/infra/typeorm/repositories/ReviewsRepository';
import IReviewsRepository from 'src/repositories/IReviewsRepository';

container.registerSingleton<IWorksRepository>(
  'WorksRepository',
  WorksRepository
);

container.registerSingleton<IReviewsRepository>(
  'ReviewsRepository',
  ReviewsRepository
);