import {inject, injectable} from 'tsyringe';
import AppError from 'src/errors/AppError';
import IWorksRepository from 'src/repositories/IWorksRepository';

import Work from 'src/models/Work';

interface IRequest {
  name: string;
  published_at: Date;
  description: string;
  gender: string;
  platforms?: string;
  game_mode?: string;
  origin_country?: string;
}

@injectable()
class CreateWorkService {
  constructor (
    @inject('WorksRepository')
    private worksRepository: IWorksRepository,
  ) {}

  public async execute(data: IRequest): Promise<Work> {
    if (!data.name || !data.gender || !data.description) {
      throw new AppError('Os campos obrigatórios não podem ser vazios', 400);
    }

    if (!['game', 'movie'].includes(data.gender)) {
      throw new AppError(
        `O campo 'gender' deve ser igual á 'movie' ou 'game'`,
        400
      );
    }

    try {
      const work = await this.worksRepository.create(data);

      return work;
    } catch (error) {
      throw new AppError('Não foi possível cadastrar obra', 500);
    }
  }
}

export default CreateWorkService;