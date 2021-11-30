import Work from "src/models/Work";

export interface IListWorksDTO {
  gender?: string; // TODO: mudar para classe genero
  name?: string;
  page?: number;
  limit?: number;
}

export interface IListWorksResponseDTO {
  works: Work[];
  totalCount: number;
}