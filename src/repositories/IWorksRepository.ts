import { IListWorksDTO, IListWorksResponseDTO } from "src/dtos/IListWorksDTO";

import Work from "src/models/Work";

export default interface IWorksRepository {
  find(data: IListWorksDTO): Promise<IListWorksResponseDTO>;
  findById(id: number): Promise<Work | undefined>;
}