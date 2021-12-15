import { inject, injectable } from 'tsyringe';
import AppError from "src/errors/AppError";
import IWorksRepository from "src/repositories/IWorksRepository";

interface IRequest {
  page?: number;
  limit?: number;
  gender?: string;
  name?: string;
  order_by?: string;
}

@injectable()
class ListWorksService {
  constructor (
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) {}

  public async execute(data: IRequest) {

    if (data.order_by !== undefined && !['popularity', 'rating'].includes(data.order_by)) {
      throw new AppError(
        `Valor inválido para o campo 'order_by'`, 
        400);
    }

    if (data.gender !== undefined && !['movie', 'game'].includes(data.gender)) {
      throw new AppError(
        `Valor inválido para o campo 'gender'`, 
        400);
    }

    try {
      const works = await this.worksRepository.find(data);

      return works;
    } catch (error) {
      console.log(error)
      throw new AppError('Não foi possível recuperar obras', 500);
    }
  }
}

export default ListWorksService;