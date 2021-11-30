import ICreateReviewDTO from "src/dtos/ICreateReviewDTO";
import {IListReviewsDTO, IListReviewsResponseDTO} from "src/dtos/IListReviewsDTO";
import Review from "src/models/Review";

export default interface IReviewRepository {
  findByWork(data: IListReviewsDTO): Promise<IListReviewsResponseDTO>;
  create(data: ICreateReviewDTO): Promise<Review>;
}