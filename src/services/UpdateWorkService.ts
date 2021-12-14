import { inject, injectable } from "tsyringe";
import AppError from "src/errors/AppError";
import IWorksRepository from "src/repositories/IWorksRepository";

interface IRequest {
  id: number;
  name?: string;
  published_at?: Date;
  description?: string;
  gender?: string;
  platforms?: string;
  game_mode?: string;
  origin_country?: string;
}

@injectable()
class UpdateWorkService {
  constructor(
    @inject("WorksRepository")
    private worksRepository: IWorksRepository
  ) {}

  public async execute(data: IRequest) {
    try {
      var work = await this.worksRepository.findById(data.id);
    } catch (error) {
      throw new AppError("Não foi possível recuperar obra", 500);
    }

    if (!work) {
      throw new AppError("Obra não encontrada", 404);
    }

    // Validações de campos obrigatórios
    if (data.name !== undefined && !data.name) {
      throw new AppError("Campos obrigatórios não podem ser vazios", 400);
    }

    if (data.description !== undefined && !data.description) {
      throw new AppError("Campos obrigatórios não podem ser vazios", 400);
    }

    if (data.published_at !== undefined && !data.published_at) {
      throw new AppError("Campos obrigatórios não podem ser vazios", 400);
    }

    work.name = data.name !== undefined ? data.name : work.name;
    work.published_at = data.published_at !== undefined ? data.published_at : work.published_at;
    work.description = data.description !== undefined ? data.description : work.description;
    work.platforms = data.platforms !== undefined ? data.platforms : work.platforms;
    work.game_mode = data.game_mode !== undefined ? data.game_mode : work.game_mode;
    work.origin_country = data.origin_country !== undefined ? data.origin_country : work.origin_country;

    try {
      return await this.worksRepository.save(work);
    } catch (error) {
      throw new AppError("Não foi possível atualizar obra", 500);
    }
  }
}

export default UpdateWorkService;
