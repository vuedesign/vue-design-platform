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
}

export interface IPaginationQuery {
  page?: number;
  size?: number;
  order?: object;
  where?: object;
  relations?: FindOptionsRelations<any>;
  select?: object;
}

export class BaseService {
  constructor(private readonly currentRepository: Repository<any>) {}
  async findListAndPage(query: IPaginationQuery): Promise<IPaginationResponse> {
    const {
      page = 1,
      size = 20,
      order = {},
      where = {},
      relations = {},
      select = {},
    } = query;
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
