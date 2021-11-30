import { inject, injectable } from 'tsyringe';
import AppError from "src/errors/AppError";
import IWorksRepository from "src/repositories/IWorksRepository";

interface IRequest {
  page?: number;
  limit?: number;
  gender?: string;
  name?: string;
}

@injectable()
class ListWorksService {
  constructor (
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) {}

  public async execute(data: IRequest) {
    try {
      const works = await this.worksRepository.find(data);

      return works;
    } catch (error) {
      throw new AppError('Não foi possível recuperar obras', 500);
    }
  }
}

export default ListWorksService;