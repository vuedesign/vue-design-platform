import { Repository, FindOptionsRelations } from 'typeorm';

export interface IPagination {
  page?: number;
  size?: number;
}

export interface IPaginationResponse<T = any> {
  list: Array<T>;
  pagination: IPagination;
  total: number;
}

export interface IPaginationOptions {
  pagination?: IPagination;
  order?: object;
  where?: object;
  relations?: FindOptionsRelations<any>;
  select?: object;
  nots?: object;
}

export class BaseService {
  constructor(private readonly currentRepository: Repository<any>) {}
  async findListAndPage(
    options: IPaginationOptions,
  ): Promise<IPaginationResponse> {
    const {
      pagination = { page: 1, size: 20 },
      order = {},
      where = {},
      relations = {},
      select = {},
    } = options || {};
    const { page, size } = pagination;
    const [list, total]: [Array<any>, number] =
      await this.currentRepository.findAndCount({
        take: size,
        skip: (page - 1) * size,
        order,
        where,
        relations,
        select,
      });
    return {
      list,
      pagination: {
        page,
        size,
      },
      total,
    };
  }
}
