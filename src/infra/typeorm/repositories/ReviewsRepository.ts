import { getRepository, Repository } from 'typeorm';
import IReviewRepository from "src/repositories/IReviewsRepository";
import { IListReviewsDTO, IListReviewsResponseDTO } from 'src/dtos/IListReviewsDTO';
import ICreateReviewDTO from 'src/dtos/ICreateReviewDTO';
import Review from 'src/models/Review';


class ReviewsRepository implements IReviewRepository {
  private ormRepository: Repository<Review>;

  constructor () {
    this.ormRepository = getRepository(Review);
  }

  public async findByWork(data: IListReviewsDTO): Promise<IListReviewsResponseDTO> {
    const qb = this.ormRepository.createQueryBuilder('reviews');

    qb.andWhere(`work_id = ${data.work_id}`);

    const totalCount = await qb.getCount();

    const reviews = await qb
      .skip((data.page - 1) * data.limit)
      .take(data.limit)
      .getMany();

    return {reviews, totalCount};
  }

  public async create(data: ICreateReviewDTO): Promise<Review> {
    const review = this.ormRepository.create(data);

    await this.ormRepository.save(review);

    return review;
  }
}

export default ReviewsRepository;