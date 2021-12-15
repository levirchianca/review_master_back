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
      qb.andWhere(`works.gender = '${data.gender}'`);
    }

    if (data.name) {
      qb.andWhere(`works.name LIKE '%${data.name}%'`);
    }

    // Ordenar por nota e por quantidade de reviews
    if (data.order_by) {
      qb.leftJoin('reviews', 'reviews', 'reviews.work_id = works.id');

      qb.addGroupBy('reviews.work_id');

      if (data.order_by == 'popularity') {
        qb.addSelect(['COUNT(*) as reviews_count'])
        qb.orderBy('reviews_count', 'DESC')
      } else {
        qb.addSelect(['AVG(reviews.note) as reviews_mean'])
        qb.orderBy('reviews_mean', 'DESC')
      }
    }

    // Paginação
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