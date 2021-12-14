import { getRepository, Repository } from 'typeorm';
import IWorksRepository from "src/repositories/IWorksRepository";
import { IListWorksDTO, IListWorksResponseDTO } from "src/dtos/IListWorksDTO";
import ICreateWorkDTO from 'src/dtos/ICreateWorkDTO';

import Work from "src/models/Work";

class WorksRepository implements IWorksRepository {
  private ormRepository: Repository<Work>;

  constructor () {
    this.ormRepository = getRepository(Work);
  }

  public async find(data: IListWorksDTO): Promise<IListWorksResponseDTO> {
    const page = data.page || 1;
    const limit = data.limit || 15;

    const qb = this.ormRepository.createQueryBuilder('works');

    // Add filtros
    if (data.gender) {
      qb.andWhere(`gender = '${data.gender}'`);
    }

    if (data.name) {
      qb.andWhere(`name LIKE '%${data.name}%'`);
    }

    // TODO: Ordenar por nota e por quantidade de reviews

    // Ordenação
    const totalCount = await qb.getCount();

    const works = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {works, totalCount};
  }

  public async findById(id: number): Promise<Work | undefined> {
    const work = await this.ormRepository.findOne({
      where: { id }
    });

    return work;
  }

  public async create(data: ICreateWorkDTO): Promise<Work> {
    const work = await this.ormRepository.create(data);

    await this.ormRepository.save(work);

    return work;
  }

  public async save(work: Work): Promise<Work> {
    return await this.ormRepository.save(work);
  }
}

export default WorksRepository;