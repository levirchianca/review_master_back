import {inject, injectable} from 'tsyringe';
import AppError from "src/errors/AppError";
import IWorksRepository from "src/repositories/IWorksRepository";
import Work from "src/models/Work";

@injectable()
class ShowWorkService {
  constructor (
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) {}

  public async execute(id: number): Promise<Work | undefined> {
    try {
      const work = await this.worksRepository.findById(id);

      return work;
    } catch (error) {
      throw new AppError('Não foi possível recuperar obra', 500);
    }
  }
}

export default ShowWorkService;