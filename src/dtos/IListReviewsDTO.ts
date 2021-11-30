import Review from "src/models/Review";

export interface IListReviewsDTO {
  work_id: number;
  page: number;
  limit: number;
}

export interface IListReviewsResponseDTO {
  reviews: Review[];
  totalCount: number;
}