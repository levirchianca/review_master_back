import ICreateReviewDTO from "src/dtos/ICreateReviewDTO";
import AppError from "src/errors/AppError";
import IReviewRepository from "src/repositories/IReviewsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  work_id: number;
  note: string;
  title: string;
  description: string;
  author: string;
}

@injectable()
class CreateReviewService {
  constructor (
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewRepository
  ) {}

  public async execute(data: IRequest) {
    try {
      const review = await this.reviewsRepository.create(data);

      return review;
    } catch (error) {
      throw new AppError('Não foi possível criar review', 500);
    }
  }
}

export default CreateReviewService;