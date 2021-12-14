import ICreateWorkDTO from "src/dtos/ICreateWorkDTO";
import { IListWorksDTO, IListWorksResponseDTO } from "src/dtos/IListWorksDTO";

import Work from "src/models/Work";

export default interface IWorksRepository {
  find(data: IListWorksDTO): Promise<IListWorksResponseDTO>;
  findById(id: number): Promise<Work | undefined>;
  create(data: ICreateWorkDTO): Promise<Work>;
  save(work: Work): Promise<Work>;
}