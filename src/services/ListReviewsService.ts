import {inject, injectable} from 'tsyringe';

import IReviewsRepository from 'src/repositories/IReviewsRepository';
import Review from 'src/models/Review';
import AppError from 'src/errors/AppError';

interface IRequest {
  work_id: number;
  page: number;
  limit: number;
}

@injectable()
class ListReviewsService {
  constructor (
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository
  ) {}

  public async execute(data: IRequest) {
    try {
      const reviews = await this.reviewsRepository.findByWork(data);

      return reviews;
    } catch (error) {
      throw new AppError('Não foi possível recuperar reviews', 500);
    }
  }
}

export default ListReviewsService;