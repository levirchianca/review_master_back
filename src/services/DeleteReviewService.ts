import {inject, injectable} from 'tsyringe';
import AppError from 'src/errors/AppError';
import IReviewsRepository from 'src/repositories/IReviewsRepository';

@injectable()
class DeleteReviewService {
  constructor (
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    try {
      await this.reviewsRepository.delete(id);
    } catch (error) {
      throw new AppError('Não foi possível deletar review', 500);
    }
  }
}

export default DeleteReviewService;