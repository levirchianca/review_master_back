import { Request, Response } from "express";
import { container } from "tsyringe";

import ListWorksService from "src/services/ListWorksService";
import ShowWorkService from "src/services/ShowWorkService";
import UpdateWorkService from "src/services/UpdateWorkService";
import CreateWorkService from "src/services/CreateWorkService";

class WorksController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showWork = container.resolve(ShowWorkService);

    const work = await showWork.execute(parseInt(id));

    if (work) {
      return response.json(work);
    }

    return response
      .status(404)
      .json({ error: true, message: "Nenhuma obra encontrada" });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { gender, name, page = 1, limit = 15 } = request.query;

    const listWork = container.resolve(ListWorksService);

    const { works, totalCount } = await listWork.execute({
      gender: gender as string,
      name: name as string,
      page: Number(page),
      limit: Number(limit),
    });

    response.header("X-Total-Count", String(totalCount));

    return response.json(works);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      description,
      game_mode,
      gender,
      name,
      origin_country,
      platforms,
      published_at
    } = request.body;

    const updateWork = container.resolve(UpdateWorkService);

    const work = await updateWork.execute({
      id: Number(id),
      description,
      game_mode,
      gender,
      name,
      origin_country,
      platforms,
      published_at
    });

    return response.json(work);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      description,
      game_mode,
      gender,
      name,
      origin_country,
      platforms,
      published_at
    } = request.body;
    
    const createWork = container.resolve(CreateWorkService);

    const work = await createWork.execute({
      description,
      game_mode,
      gender,
      name,
      origin_country,
      platforms,
      published_at
    });

    return response.json(work);
  }
}

export default WorksController;
