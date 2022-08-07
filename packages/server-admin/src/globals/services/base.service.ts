import { Repository, FindManyOptions } from 'typeorm';

export interface IPagination {
  page?: number;
  size?: number;
}

export interface IPaginationResponse<T = any> {
  list: Array<T>;
  pagination: IPagination;
  total: number;
}

export interface IPaginationOptions<E> extends FindManyOptions<E> {
  pagination?: IPagination;
}

export class BaseService<E> {
  constructor(private readonly currentRepository: Repository<any>) {}
  async findListAndPage(
    options: IPaginationOptions<E>,
  ): Promise<IPaginationResponse> {
    console.log('options admin', options);
    const {
      pagination = {},
      order = {},
      where = {},
      relations = {},
      select = {},
    } = options || {};
    const { page = 1, size = 20 } = pagination;
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
